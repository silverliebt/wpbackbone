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
        ,'views/pages/page'
       ],function( $, global, svg, _ , Backbone, Plugins, BasePageView, SlideshowView, WorkModel, PageView ) {       
    
     
    var Work = PageView.extend({

      //model: new WorkModel(),  

      initialize: function( options ){
        // call PageView setAttributes
            this.setAttributes( options );

        _.bindAll(this);

        // resize handler
        global.handlers.resize.add({ 
          'id'      : 'work',
          'callback': this.onresize 
        }); 
      },
    


      // render called in PageView, after page loaded build is called
      build: function(){ 

        this.setupSlideShow();
 
        if( global.smart.device )
          this.$el.find('.touchswipe').delay(4000).fadeOut(300);

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