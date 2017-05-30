/**
 * Created by pfbongio on 02/09/2016.
 */
/* global ga USE_GA */
let useGa = false
function _gaCheck () {
    return useGa && ga
}

export function initGA (propertyId, options = {}) {
    if (options && options.checkFn && typeof checkFn === 'function') {
        useGa = options.checkFn()
        if (!useGa) return
    }
    if (options && !options.DISABLE_DOM_CHECK) {
        useGa = useGa || window.USE_GA === true
    }
    if (options && !options.DISABLE_GLOBAL_SCOPE_CHECK) {
        if (typeof USE_GA !== 'undefined') {
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
    /* eslint-disable */
    if (typeof ga === 'undefined') {
        // Initialize only if it's not done already via template scripts
        if (!propertyId) return
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date()
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0]
            a.async = 1
            a.src = g
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')
        /* eslint-enable */
        ga(() => {
            const trackers = ga.getAll()
            if (!(trackers && trackers.length > 0)) {
                ga('create', propertyId, 'auto', options && options.gaCreateOptions ? options.gaCreateOptions : {})
            }
        })
    }
}

export function recordScreenRender (screenName) {
    try {
        if (_gaCheck()) {
            ga('send', 'screenview', {
                screenName
            })
        }
    } catch (err) {

    }
}

export function recordEvent (category, action, label, value) {
    try {
        if (_gaCheck()) {
            ga('send', 'event', category, action, label, value)
        }
    } catch (err) {

    }
}

let oldView = null
export function recordNewView (view) {
    try {
        if (_gaCheck()) {
            if (oldView !== view) {
                oldView = view
                if (view) {
                    ga('set', 'page', view)
                }
                ga('send', 'pageview')
            }
        }
    } catch (err) {

    }
}
