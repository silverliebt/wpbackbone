/*
* views / pages / fun
* - - - - - - - - - - - - - -
*/
define([ 'jquery'
        ,'global'
        ,'underscore' 
        ,'plugins' 
        ,'views/pages/base'
        ,'models/pages/fun'
        ,'views/pages/fun/lazyline'
        ,'views/pages/fun/box2d'
        ,'views/pages/fun/fonts' 
       ],function( $, global, _ , Plugins, BasePageView, FunModel, LazylineView, Box2dView, FontsView ) {       
     
    
    var Fun = BasePageView.extend({

        model : new FunModel(),
 
        initialize: function(){
            _.bindAll(this);

            this.views = [];
            this.currentView;
        },

        render: function(){ 

            this.menu();

            // init Biography View
            this.llpView = new LazylineView({ el : this.$el.find('.lazylinepainter') }); 
            this.currentView = this.llpView;
            this.currentView.render(); 

            // Add llpView obj to instance stack in model.
            // BaseView enable / disable will fire llpView enable / disable callbacks on page change
            this.addInstance({ 
                hook : 'llp', 
                obj : this.llpView 
            });

            // // init Skills View
            // this.box2dView = new Box2dView({ el : this.$el.find('.box2d') });   

            // init Experience View
            this.fontsView = new FontsView({ el : this.$el.find('.fonts') });
            this.currentView = this.fontsView; 

            this.addInstance({ 
                hook : 'fonts', 
                obj : this.fontsView 
            });

            this.views = [ this.llpView , this.fontsView ];
 
            return this;
        },


        menu : function(){

            var that = this;
 
            this.$el.find('.menu span').on('click', function(){

                //that.$el.find('.menu').addClass('hide');

                // disable each view
                $.each( that.views, function(){

                    if( this.getter( 'rendered' ) )
                        this.disable();
                });

                // ind target view
                var c = $(this).attr('class');
                c = c.replace('-link','');
                that.currentView = that[c+'View'];
                
                // render or enable
                if( that.currentView.getter( 'rendered' ) ){
                    that.currentView.enable(); 
                }
                else{
                    // if( c == 'box2d' ){

                    //     var faq = null; 
       
                    //     if (faq === "loading") 
                    //         return; 
  
                    //     faq = "loading";

                    //     // Load the FAQ module.
                    //     // require(
                    //     //     [ "box2d" ],
                    //     //     function( box2d ){
 
                    //     //         that.currentView.render();
                    //     //     }
                    //     // );
                    // }

                    that.currentView.render();
                    that.currentView.enable();  
                }

                //that.arrows('disable');

                // if( that.currentView.arrows )
                //     that.arrows('enable'); 
            })
        },


        arrows : function( state ){

            var that = this,
                $arrows = this.$el.find('.arrow'),
                $right = this.$el.find('.right'),
                $left = this.$el.find('.left');
    
            if ( state === 'enable' ){
                $arrows.fadeIn(500);
                $left.on('click', that.currentView.prev );
                $right.on('click', that.currentView.next );
            }
            else{
                $arrows.fadeOut(500);
                $left.off();
                $right.off();
            }
        }
    });
    
    return Fun;
});