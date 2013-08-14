/*
* views / pages / work
* - - - - - - - - - - - - - -
*/
define([ 'jquery'
        ,'global'
        ,'models/svg'
        ,'underscore'
        ,'backbone'
        ,'plugins'
        ,'views/pages/base'
        ,'views/widgets/slideshow'
        ,'models/pages/work'
       ],function( $, global, svg, _ , Backbone, Plugins, BasePageView, SlideshowView, WorkModel ) {       
    
     
    var Work = BasePageView.extend({

      model: new WorkModel(),  

      initialize: function(){
        _.bindAll(this);

        // resize handler
        global.handlers.resize.add({ 
          'id'      : 'work',
          'callback': this.onresize 
        }); 
      },
    
      render: function(){ 

        this.setupSlideShow();
 
        if( global.smart.device )
          this.$el.find('.touchswipe').delay(1300).fadeOut(300);

        svg.build('design-icon', this.$el );
        svg.build('development-icon', this.$el );
        svg.build('motion-icon', this.$el );
 
        return this;
      }, 
 

      onresize : function(){
      },


      setupSlideShow : function(){

        var that = this;
        $.each(this.$el.find('.slideshow'), function(){
          
          var slideshowView = new SlideshowView({ el : $(this) }); 
          slideshowView.render(); 

          // Add slideshow obj to instance stack in model.
          // BaseView enable / disable will fire slideshow enable / disable callbacks on page change
          that.addInstance({ 
            hook : slideshowView.id, 
            obj : slideshowView 
          });         
        });
      }  
    });
    
    return Work;
});