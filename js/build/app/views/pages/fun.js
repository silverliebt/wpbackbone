/*
* views / pages / fun
* - - - - - - - - - - - - - -
*/
define([ 'jquery'
        ,'global'
        ,'underscore' 
        ,'plugins' 
        ,'views/pages/page'
        ,'collections/demos'
        ,'views/pages/fun/demo'
       ],function( $, global, _ , Plugins, PageView, DemosCollection, DemoView ) {       
     
    
    var Fun = PageView.extend({
 
        initialize: function( options ){
 
            // call PageView setAttributes
            this.setAttributes( options );

            _.bindAll(this);
 
            this.currentView; 
        }, 


        // render called in PageView, after page loaded build is called
        build: function(){ 

            this.menu();

            // init Biography View
            // this.llpView = new LazylineView({ el : this.$el.find('.lazylinepainter') }); 
            // this.currentView = this.llpView;
            // this.currentView.setter('current', true);
            // this.currentView.render(); 

            // // Add llpView obj to instance stack in model.
            // // BaseView enable / disable will fire llpView enable / disable callbacks on page change
            // this.addInstance({ 
            //     hook : 'llp', 
            //     obj : this.llpView 
            // });

            // // // init Skills View
            // // this.box2dView = new Box2dView({ el : this.$el.find('.box2d') });   

            // // init Experience View
            // this.fontsView = new FontsView({ el : this.$el.find('.fonts') });
            // this.currentView = this.fontsView; 

            // this.addInstance({ 
            //     hook : 'fonts', 
            //     obj : this.fontsView 
            // });

            //this.views = [ this.llpView , this.fontsView ];

            this.pages = {}; // child views

            this.collection = new DemosCollection();
            this.collection.fetch({ success : this.initSubViews, dataType: "jsonp" });
 
            return this;
        },


        initSubViews :  function(){
            // append pages to the DOM from DemoCollection models,
            // except the currentpage, which is already on the DOM
            this.collection.each( function( page ){
 
                var slug = page.get('slug'),
                    urlValue = this.getter( 'urlValues' ),
                    currentPage = ( urlValue[1] === slug ) ? true : false,
                    demoView;
    
                if( currentPage ){
                    demoView = new DemoView({ model: page, el: $('.current-page') });
                    demoView.model.set( 'loaded', true );
                } else {
                    // init new page view
                    demoView = new DemoView({ model: page });
                    // add to page
                    this.$el.append( demoView.el );
                }

                // setView
                demoView.setView();

                this.pages[ slug ] = demoView;
            }, this ); 
        },


        menu : function(){

            var that = this;

            this.$el.find('.scrollpane').prepend('<div class="menu tOpacity" / >');

            $.each( this.getter( 'children' ) , function(){
                that.$el.find('.menu').append('<span class="'+this.slug+'">'+this.title+'</span>'); 
            });


            this.$el.find('.menu span').on('click', function(){

                if( $(this).hasClass('selected') )
                    return;

                that.$el.find('.menu .selected').removeClass('selected');

                $('.preloader').fadeIn(500);

                // disable each view
                $.each( that.views, function(){
                    if( this.getter( 'current' ) )
                        this.disable();
                });

                // ind target view
                var c = $(this).attr('class');
                c = c.replace('-link','');
                that.currentView = that[c+'View'];

                $(this).addClass('selected');
                
                // render or enable
                if( !that.currentView.getter( 'rendered' ) )
                     that.currentView.render();
                
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

                that.currentView.setter('current', true); 
                that.currentView.enable();   

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