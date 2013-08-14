/*
* views / pages / me / skills
* - - - - - - - - - - - - - -
*/

define([ 'jquery'
        ,'global'
        ,'underscore'
        ,'backbone'
        ,'plugins'
       ],function( $ , global, _ , Backbone , Plugins) {       
    
     
    var Box2dView = Backbone.View.extend({
 
 
        initialize: function(){

            _.bindAll(this);

            this.rendered = false; 

            this.arrows = false;
        },


        render : function(){

            this.rendered = true;

            var that = this;


  
  
            this.enable();

            return this;
        },


        enable : function(){
            this.$el.addClass('reveal'); 
        },


        disable : function(){
            this.$el.removeClass('reveal'); 
        }
    });
    
    return Box2dView; 
});  