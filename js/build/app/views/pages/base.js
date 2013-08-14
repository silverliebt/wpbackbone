
/*
* views / pages / base
* - - - - - - - - - - - - - -
*/
define([ 'jquery'
        ,'global'
        ,'underscore'
        ,'backbone'
        ,'models/pages/base'
        ,'views/widgets/slideshow'
       ],function( $, global, _ , Backbone, BasePageModel ) {       
    
     
    var BasePageView = Backbone.View.extend({
 

      constructor: function() { 
 
        // Call the original constructor
        Backbone.View.apply(this, arguments);

        this.initscroll();
      },

      addInstance : function( arg ){
        this.model.addInstance({
          hook : arg.hook,
          enable  : arg.obj.enable,
          disable : arg.obj.disable
        });
      },
      
      enable : function(){ 
  
        var instances = this.getter( 'instances' );
        $.each( instances , function(){
          this.enable();
        });
      },

      disable : function(){ 
 
        var instances = this.getter( 'instances' );
        $.each( instances , function(){
          this.disable(); 
        });
      },

      getter : function( target ){ 
        return this.model.get( target );
      },

      setter : function( target , value ){ 
        this.model.set( target , value );
      },

      initscroll : function(){

        var that = this,
            scroll = {
              enable :  function(){ that.$el.find('.scrollpane').on('scroll',  _.throttle( global.handlers.scroll.update, 150) ); },
              disable : function(){ that.$el.find('.scrollpane').off(); }
            }

        this.addInstance({
          hook:'scroll',
          obj : scroll
        });
      }
    });
    
    return BasePageView;
});