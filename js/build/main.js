require.config({
    
    urlArgs: "bust=" + (new Date()).getTime(),
    
    baseUrl: WP.THEME_URL+"/js/build/app",
    
    // The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
    
    paths: {
        "app"           : "app"
        , "global"      : "global"
        //, "marionette"  : "../lib/backbone.marionette.min"
        , "jquery"      : "../lib/jquery-2.0.2.min"
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
        },
        "marionette" : {
            "deps" : [ "jquery" , "underscore" , "backbone" ],
            "exports" : "Marionette"
        }
    }
});


require([   
    'jquery',
    'global',
    'underscore', 
    'backbone', 
    'app'], function( $ , global,  _ , Backbone , App ){
    
    App.initialize(); 
});