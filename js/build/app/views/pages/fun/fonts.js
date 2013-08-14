/*
* views / pages / me / exp
* - - - - - - - - - - - - - -
*/

define([ 'jquery'
        ,'global'
        ,'models/svg'
        ,'underscore'
        ,'backbone' 
        ,'plugins'
       ],function( $ , global, svg,  _ , Backbone , Plugins ) {       
    
     
    var FontsView = Backbone.View.extend({
 
 
        initialize: function(){
            _.bindAll(this); 

            this.enable();

            this.rendered = false;

            this.arrows = true;
        }, 


        render : function(){

            this.rendered = true;

            svg.build('design-icon', this.$el );
            svg.build('development-icon', this.$el );
            svg.build('motion-icon', this.$el );

            return this;
        },


        enable : function(){
            this.$el.addClass('reveal'); 
        },


        disable : function(){
            this.$el.removeClass('reveal'); 
        }
  
    });
    
    return FontsView; 
}); 