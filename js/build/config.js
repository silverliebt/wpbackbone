require.config({
    deps: ['../main'], //load main.js

    locale: 'en-us',

    keepBuildDir: true,

    //TODO remove
    // urlArgs: "bust="+ (new Date()).getTime(), //cache killer

    // Paths that contain the various different javascript files.
    paths: {
        "app"           : "app"
        //, "box2d"       : "../lib/Box2dWeb-2.1.a.3.min"
        , "jquery"      : "../lib/jquery-2.0.2.min"
        , "global"      : "global"
        , "underscore"  : "../lib/underscore-min"
        , "backbone"    : "../lib/backbone-min"
        , "plugins"     : "../lib/plugins"
        , "raphael"     : "../lib/raphael-min" 
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
        } 
    }
});