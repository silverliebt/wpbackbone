/*
* views / pages / me / exp
* - - - - - - - - - - - - - -
*/

define([ 'jquery'
        ,'global'
        ,'views/pages/base'
        ,'underscore'
        ,'backbone' 
        ,'plugins'
        ,'views/widgets/slideshow'
        ,'models/pages/fun/demo'
       ],function( $ , global, BasePageView ,  _ , Backbone , Plugins, SlideshowView, DemoModel ) {       
    
     
    var FontsView = BasePageView.extend({
 

        model : new DemoModel(),

 
        initialize: function(){
            _.bindAll(this);  

            this.setter( 'demos' , [ 'block', 'handybit', 'ddu' , 'softsurf' ] ); 
        }, 


        render : function(){

            var that = this;

            this.setter( 'rendered', true );

            var demos = this.getter('demos');

            $.each( demos , function(){
                that.$el.find('.slideshow').append('<div class="slide '+this+'" ><div class="inner" /></div>');
            })

            this.setupSlideshow();

            this.update(); 
 
            return this;
        },


        setupSlideshow : function(){

            this.slideshowView = new SlideshowView({ 
                el : this.$el.find('.slideshow'),
                beforeComplete : this.beforeComplete 
            }); 

            this.slideshowView.render();  
 
            // Add slideshow obj to instance stack in model.
            // BaseView enable / disable will fire slideshow enable / disable callbacks on page change
            this.addInstance({ 
                hook : this.slideshowView.id, 
                obj  : this.slideshowView 
            }); 
        },


        // called from BasePageView
        onEnable :  function(){  this.$el.addClass('reveal'); },


        // called from BasePageView
        onDisable : function(){  this.$el.removeClass('reveal'); },

 
        beforeComplete : function( direction ){
 
            var index = this.getter( 'index' ),
                demos  = this.getter( 'demos' );

            if( direction === 'right' )
                if( index == ( demos.length-1 ) )
                    index = 0;
                else
                    index++;
            else
                if( index == 0 )
                    index = demos.length-1;
                else
                    index--;

            this.setter( 'index' , index );
            this.update();
        },

 

        update : function(){

            var index = this.getter( 'index' ),
                demos  = this.getter( 'demos' );
 
            this.$el.find('.slideshow .slide:nth-child('+ (index+1) +')').addClass('display');
        }
    });
    
    return FontsView; 
}); 