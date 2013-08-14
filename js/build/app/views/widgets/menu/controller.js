/*
* views / widgets / menu / controller
* - - - - - - - - - - - - - -
*/

define([ 'jquery'
        ,'global'
        ,'underscore'
        ,'backbone'
        ,'collections/menu'
        ,'views/widgets/menu/listItem'
        ,'models/svg'
        ,'plugins'
        , 'models/menu'
       ],function( $, global , _ , Backbone, MenuCollection, MenuItemView, svg, Plugins, MenuModel) {       
    
    
    //  The View the Menu 
    
    var MenuView = Backbone.View.extend({
 
        initialize: function(){
               
            _.bindAll(this);

            this._views = {}; // child views

            this.smallDevices();
        },


        getItems: function(){
 
            var items = []; 

            if(!global.bootstrap.linkcolour )
                global.bootstrap.linkcolour = '#fff';

            $('#menu-custom-menu a').each(function(){
                items.push({            
                    selected: ( $(this).parent().hasClass('current-menu-item') ) ? true : false,
                    slug    : $(this).data('slug'),
                    urlValues : [ $(this).data('slug') ], // in the future nested menu items wil be added to this array 
                    pageId  : $(this).data('pageid'),
                    idAttr  : '#'+$(this).parent().attr('id')
                });
            });

            return items;
        },


        render : function(){

            // delay
            var d = 400,
                that = this;

            this.collection.each(function( menuItem ){

                menuItem.set('delay', d);
                var menuItemView = new MenuItemView({ el: $(menuItem.get('idAttr')), model: menuItem });
                that._views[menuItem.get('pageId')] = menuItemView;
                d += 600;
            });

            
            $('.upward').on('click', function(){
                $('.current-page .scrollpane').scrollTo(0, {duration:2000} ); 
            })


            this.onscroll();

            return this;
        },


        onscroll : function(){
 
            var $header = $('header .inner'), 
                $up = $('header .upward'), 
                offset = 20, 
                that = this;

            global.handlers.scroll.add({ 
                'id'      : 'menu',
                'callback': { 
                    'start': offset, 
                    'end': 3000,
                    'callback' : function( scrollTop , scrollDirection ){  

                        if( scrollTop > ( global.screen.height / 2 ) ){
                            $header.fadeOut(500); 
                            $up.fadeIn(500); 
 
                        } else if ( scrollTop < ( global.screen.height / 2 ) ) {
                            $header.fadeIn(500); 
                            $up.fadeOut(500); 

                            // $.each(that._views, function(){
                            //     this.calcTopMargin( scrollTop );
                            // });
                        }
                    } 
                }
            }); 
        },


        setCollection : function( c ){

            this.collection = c;

            this.render();

            return this;
        }, 

        smallDevices : function(){

            var $button = $('#site-navigation h1'),
                $menu   = $('#menu-custom-menu'),
                that    = this; 

            $button.on('click', function() {

                if ( !$menu.hasClass( 'nav-menu' ) )
                    $menu.addClass( 'nav-menu' );

                if ( $(this).hasClass( 'toggled-on' ) ) {

                    $(this).removeClass( 'toggled-on' );
                    $menu.removeClass( 'toggled-on' );
                    
                    that.$el.removeClass( 'main-small-navigation' );
                    that.$el.addClass( 'navigation-main' );                

                } else {

                    $(this).addClass( 'toggled-on' );
                    $menu.addClass( 'toggled-on' );

                    that.$el.removeClass( 'navigation-main' );
                    that.$el.addClass( 'main-small-navigation' ); 
                }
            });
        }
    });
    
    return MenuView;
});

