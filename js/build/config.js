require.config({
    deps: ['../main'], //load main.js

    locale: 'en-us',

    keepBuildDir: true,

    //TODO remove
    // urlArgs: "bust="+ (new Date()).getTime(), //cache killer

    // Paths that contain the various different javascript files.
    paths: {
        "app"           : "app"
        , "jquery"      : "../lib/jquery-2.0.2.min"
        , "global"      : "global"
        , "underscore"  : "../lib/underscore-min"
        , "backbone"    : "../lib/backbone-min"
        , "plugins"     : "../lib/plugins"
        , "raphael"     : "../lib/raphael-min"
        , "foundation"  : "../lib/foundation/foundation.min"
        , "foundation/orbit" : "../lib/foundation/foundation.orbit" 
    },

    shim: {
        "underscore" :{
            "exports" : "_"
        },
        "jquery" : {
            "exports" : "$"
        },
        "backbone": {
            "deps" : [ "jquery" , "underscore" ],
            "exports" : "Backbone"
        },
        "foundation": {
            "deps" : [ "jquery" ],
            "exports" : "foundation"
        },
        "foundation/orbit": {
            "deps" : [ "jquery", "foundation" ]
        }
    }
});