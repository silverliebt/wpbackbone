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
       ],function( $ , global, svg,  _ , Backbone , Plugins) {       
    
     
    var ExperienceView = Backbone.View.extend({
 
 
        initialize: function(){
            _.bindAll(this); 

            this.rendered = false;
        }, 


        render : function(){

            this.rendered = true;

            svg.build('design-icon', this.$el );
            svg.build('development-icon', this.$el );
            svg.build('motion-icon', this.$el );

            return this;
        }
  
    });
    
    return ExperienceView; 
}); 