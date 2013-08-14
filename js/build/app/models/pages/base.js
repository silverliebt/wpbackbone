// Filename: models / pages / base
define([
    'underscore',
    'backbone'
], function( _ , Backbone ){
  
    // About Model
    var BasePageModel = Backbone.Model.extend({

        defaults : {
            instances : []
        },
        
        constructor: function() {
            // Define the subviews object off of the prototype chain
            // this.defaults = {
            //     instances : []
            // };

            // Call the original constructor
            Backbone.Model.apply(this, arguments);
        },

        // used to push new obj's into instance stack ,
        // we loop through these objs and disable / enable them when needed
        // ie - the custom scrollbar on each page
        addInstance : function( item ){
            var instances = this.get('instances');
            instances.push( item );
            this.set( 'instances' , instances ); 
        }
    });
    
    return BasePageModel;
});