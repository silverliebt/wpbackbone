// Filename: router.js
define([
  'jquery',
  'global',
  'underscore',
  'backbone'
], function( $ , global, _ , Backbone ){
  
    var Router = Backbone.Router.extend({
            
        routes: { 
            '*variables' : 'parseUrl'   
        },
        
        initialize: function(options){ 
            this.controller = options.controller;
        },

        parseUrl : function( result ){

            var values;

            if ( result === null ) { 
                values = ['home'] ;         // on homepage if result is empty
            } else {
                values = result.split("/"); // create an array of url values
                values.pop();               // remove empty value
            } 

            this.controller.update( values );
        }
    });


    var initialize = function( controller ){
         
        var router   = new Router({ controller : controller });
        var path = global.environment === 'Local'  ?  '/co' : ''; 

        Backbone.history.start( { pushState:true , root: path } );
    };
    

    return { 
        initialize: initialize 
    };
});