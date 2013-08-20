// Filename: views / pages
define([
  'jquery',
  'global',
  'underscore',
  'backbone',
  'plugins',
  'collections/pages',
  'models/pages',
  'views/page',
  'views/widgets/pageTransition'
], function($, global, _ , Backbone, Plugins, PagesCollection, PagesModel, PageView, PageTransition ){
  

    // Pages - works a collectionView for pages
    var PagesView = Backbone.View.extend({

        model: new PagesModel(),
                
        initialize: function(){

            _.bindAll(this); 

            this.pages = {}; // child views

            this.collection = new PagesCollection();
            this.collection.fetch({ success : this.render, dataType: "jsonp" });
        },

        
        // Public method
        nextPage: function( urlValues ){

            var oldValues = this.getter( 'urlValues' );
  
            if( urlValues === null || urlValues[ 0 ] === oldValues[0] )
                return; 

            this.setter( 'urlValues', urlValues ); 
 
            return this;
        },


        update: function(){

            var urlValues   = this.getter( 'urlValues' );

            this.pages[ urlValues[0] ].update( urlValues );
        },



        render: function(){ 
 
            // we want to animate SVG fill and stroke properties
            $.Color.hook( "fill stroke" );
            
            $('article#content > section').addClass('current-page');
            this.$el.animate({'opacity':1},500);
            $('.preloader').fadeOut(500);

            // append pages to the DOM from PagesCollection models,
            // except the currentpage, which is already on the DOM
            this.collection.each( function( page ){
 
                var slug = page.get('slug'),
                    urlValue = this.model.get( 'urlValues' ),
                    currentPage = ( urlValue[0] === slug ) ? true : false,
                    pageView;
    
                if( currentPage ){
                    pageView = new PageView({ model: page, el: $('.current-page') });
                    pageView.model.set( 'loaded', true );
                } else {
                    // init new page view
                    pageView = new PageView({ model: page });
                    // add to page
                    this.$el.append( pageView.el );
                }

                // setView
                pageView.setView();

                this.pages[ slug ] = pageView;
            }, this ); 
 

            // init page transition 
            this.transition = new PageTransition();
            this.transition.setPages( this.pages );

            // enable listeners

            // on purrent page change transition views 
            this.listenTo( this.collection, 'change:current' , this.doTransition );

            // on urlValue change call pageView
            this.listenTo( this.model, 'change:urlValues' , this.update );
  
            this.update( this.getter( 'urlValues' ) );
        },

 
        doTransition : function(_model, val, opts) {
 
            // CSS Page transitions  
            // if first page load return
            if( this.getter('firstPageLoad') ){ 
                this.setter('firstPageLoad', false); 
                return false;
            }

            var oldValues = this.getter( 'urlValues' );

            this.transition.render( oldValues[ 0 ] );
        },
 

        getter : function( value ){ 
            return this.model.get( value );
        },

        setter : function( target , value ){ 
            this.model.set( target , value );
        }
    });  
            
    return PagesView;
  
});