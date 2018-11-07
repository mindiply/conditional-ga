/**
 * Created by pfbongio on 02/09/2016.
 */
/* global ga USE_GA */
let useGa: boolean = false

type GAFn = ((...prms: any) => void) & {getAll: () => any}
declare var ga: undefined | GAFn
declare var USE_GA: undefined | boolean
function _gaCheck (): boolean {
    return useGa && typeof ga !== 'undefined'
}

declare global {
    interface Window {
        USE_GA?: boolean
    }
}

export interface ConditionalGAOptions {
    checkFn?: () => boolean,
    DISABLE_DOM_CHECK?: boolean
    DISABLE_GLOBAL_SCOPE_CHECK?: boolean,
    gaCreateOptions?: any,
    locationRegEx?: RegExp,
    useGoogleOptimize?: boolean,
    googleOptimizeId?: string
}

export function initGA (
    propertyId: string,
    options: ConditionalGAOptions = {}
) {
    // In non-browser environment, stop wasting time
    if (typeof window === 'undefined') return

    if (options && options.checkFn && typeof options.checkFn === 'function') {
        useGa = options.checkFn()
        if (!useGa) return
    }
    if (options && !options.DISABLE_DOM_CHECK) {
        if (window.USE_GA === false) return
        useGa = useGa || window.USE_GA === true
    }
    if (options && !options.DISABLE_GLOBAL_SCOPE_CHECK) {
        if (typeof USE_GA !== 'undefined') {
            if (USE_GA === false) return
            useGa = useGa || USE_GA === true
        }
    }
    if (options && options.locationRegEx && options.locationRegEx instanceof RegExp) {
        if (!options.locationRegEx.test(window.location.host)) {
            useGa = false
            return
        }
        useGa = true
    }
    if (!useGa) return

    if (typeof ga === 'undefined') {
        // Initialize only if it's not done already via template scripts
        if (!propertyId) return

        ((i: any, s, o, g, r, a?: any, m?: any) => {
            /* tslint:disable:no-string-literal */
            i['GoogleAnalyticsObject'] = r
            /* tslint:enable:no-string-literal */
            /* tslint:disable:only-arrow-functions */
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * (new Date() as any)
            /* tslint:enable:only-arrow-functions */
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0]
            a.async = 1
            a.src = g
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')
        /* eslint-enable */
        ga!(() => {
            const trackers = ga!.getAll()
            if (!(trackers && trackers.length > 0)) {
                ga!('create', propertyId, 'auto', options && options.gaCreateOptions ? options.gaCreateOptions : {})
            }
        })
    }
}

export function recordScreenRender (screenName: string) {
    try {
        if (_gaCheck()) {
            ga!('send', 'screenview', {
                screenName
            })
        }
    } /* tslint:disable:no-empty */ catch (err) {} /* tslint:enable:no-empty */
}

export function recordEvent (
    category: string,
    action: string,
    label: string,
    value: string | number) {
    try {
        if (_gaCheck()) {
            ga!('send', 'event', category, action, label, value)
        }
    } /* tslint:disable:no-empty */ catch (err) {} /* tslint:enable:no-empty */
}

let oldView: string | null = null
export function recordNewView (view: string) {
    try {
        if (_gaCheck()) {
            if (oldView !== view) {
                oldView = view
                if (view) {
                    ga!('set', 'page', view)
                }
                ga!('send', 'pageview')
            }
        }
    } /* tslint:disable:no-empty */ catch (err) {} /* tslint:enable:no-empty */
}
