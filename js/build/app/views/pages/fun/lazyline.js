/*
* views / pages / fun / lazy
* - - - - - - - - - - - - - -
*/

define([ 'jquery'
        ,'global'
        ,'utils/utils'
        ,'underscore'
        ,'backbone'
        ,'plugins'
        ,'views/pages/base'
        ,'models/pages/fun/demo'
        ,'views/widgets/slideshow'
       ],function( $ , global, Utils, _ , Backbone  , Plugins, BasePageView, DemoModel, SlideshowView ) {       
    
     
    var LazylineView = BasePageView.extend({


        model : new DemoModel(),
 
        initialize: function(){

            _.bindAll(this);  
 
            this.setter( 'lazylineHandler' , [] ); 
            // used to add unique media queries to container
            this.setter( 'currentClass' , 'guy' ); 

            var applyline = ( global.smart.phone ) ? 'stamp' : 'paint';
            this.setter( 'applyline' ,  applyline );  
        },


        render : function(){
  
            var that = this;

           
            // Setup guy, but don't paint       
            var $guy = $("#ll-guy"),
                $chair = $("#ll-chair");
 
            $guy.lazylinepainter({ 
                'svgData' : global.misc.lazylinedata, 
                'strokeWidth':2, 
                'strokeColor':'#44443f',
                'scale':{
                    'container' : $guy.parent(),
                    'center':true
                }
            });
                     
            $chair.lazylinepainter({
                'svgData' : global.misc.lazylinedata, 
                'strokeWidth':2, 
                'strokeColor':'#44443f', 
                'delay':3000,
                'scale':{
                    'container' : $chair.parent(),
                    'center':true
                }
            });
           

            // Setup face, but don't paint  
            var $face = $("#ll-face");

            $face.lazylinepainter({ 
                'svgData' : global.misc.lazylinedata,
                'strokeWidth':7, 
                'strokeColor':'#44443f',
                'scale':{
                    'container' : $face.parent(),
                    'center' : true
                },
                'onComplete' : function(){
                        $(this).animate({'top':-30},500);
                    }   
            }); 
 
               
            // Setup grid, but don't paint    
            var $vert = $('#ll-vertical-grid'),
                $hori = $('#ll-horizontal-grid'),
                $shape = $('#ll-shape');

            $vert.lazylinepainter({
                    'svgData' : global.misc.lazylinedata,
                    'strokeWidth':1,  
                    'strokeColor':'#fefbf2',
                    'scale':{
                        'container' : $vert.parent(),
                        'center' : true
                    }
                }
            );
             
            $hori.lazylinepainter({
                    'svgData' : global.misc.lazylinedata,
                    'strokeWidth':1,  
                    'strokeColor':'#fefbf2',
                    'scale':{
                        'container' : $hori.parent(),
                        'center' : true
                    }
                }
            );

            $shape.lazylinepainter({
                    'svgData' : global.misc.lazylinedata,
                    'strokeWidth':2,  
                    'strokeColor':'#44443f',
                    'delay':5000,
                    'scale':{
                        'container' : $shape.parent(),
                        'center' : true
                    } 
                }
            );

            
            // setup array of demos
            this.setter( 'demos' , [ 
                [ $guy , $chair ] , 
                [ $face ] , 
                [ $vert , $hori , $shape ] 
            ]);

            // init slideshow
            this.setupSlideshow();

            // update first slide
            this.update();

            this.setter( 'rendered' , true ); 
        },


        setupSlideshow : function(){

            this.slideshowView = new SlideshowView({ 
                el : this.$el.find('.slideshow'), 
                onComplete : this.onComplete,
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
        onEnable :  function(){ this.$el.addClass('reveal'); },


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


        onComplete : function( direction ){

            var demos = this.getter( 'demos' ),
                index = this.getter( 'index' ),
                old = ( direction === 'right' ) ? index-1 : index+1;

            $.each( demos[ old ], function(){
                this.lazylinepainter('erase');
            });
        },


        update : function(){

            var demos = this.getter( 'demos' ),
                index = this.getter( 'index' ),
                applyline = this.getter( 'applyline' );
 
            $.each( demos[ index ], function(){
                this.lazylinepainter( applyline );
            });
        }
    });
    
    return LazylineView; 
}); 