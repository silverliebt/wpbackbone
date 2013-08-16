require.config({
    
    urlArgs: "bust=" + (new Date()).getTime(),
    
    baseUrl: WP.THEME_URL+"/js/build/app",
    
    // The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
    
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


require([   
    'jquery',
    'global',
    'underscore', 
    'backbone', 
    'app'], function( $ , global,  _ , Backbone , App ){
    
    App.initialize(); 
});