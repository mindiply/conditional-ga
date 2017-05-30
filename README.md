#conditional-ga
Wrapping ga functions for use with webpack. The main reason to
use the module is to make call to Google Analytics based on
either predefined DOM elements, passing a RegExp on the path
and/or running a custom passed check function.

## Use

###initGA

Initialize google analytics

    initGA ( propertyId, options = {} )
   
where **propertyId** is the Id of your property, while
the options can be:

* **options.gaCreateOptions**: dictionary you would normally pass to ga('create', ...)
* **options.DISABLE_DOM_CHECK**: if set to true, it will not check
    whether **window.USE_GA** is set to true. window.USE_GA is a
    default variable checked to see a variable set on the server side
* **options.DISABLE_GLOBAL_SCOPE_CHECK**: if set to true, it will
    skip checking whether the global variable **USE_GA** is set to
    true. This is the second default way to define the conditional
    on the server side
* **options.locationRegEx**: Regular expression that will
    test the window.location.host to decide whether to enable google 
    analytics or not.
    If the option is set and the check fails, GA will not be used
* **options.checkFn**: Function that should return truthy if you want google
    analytics enabled, false otherwise
    
    
### recordScreenRender

Record an aps screen

        recordScreenRender(screenName)
        
        
### recordEvent

Record an event

        recordEvent (category, action, label, value)
        
        
### recordNewView

Record the rendering of a new view

recordNewView (view = window.url.pathname)


## LICENSE

MIT