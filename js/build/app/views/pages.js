// Filename: views / pages
define([
  'jquery',
  'global',
  'underscore',
  'backbone',
  'plugins',
  'raphael',
  'collections/pages',
  'models/pages',
  'views/page',
  'views/widgets/pageTransition'
], function($, global, _ , Backbone, Plugins, Raphael, PagesCollection, PagesModel, PageView, PageTransition ){
  

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
  
            if( urlValues === null )
                return; 

            this.model.set( 'urlValues', urlValues );
            this.model.set( 'slug', urlValues[0] );
 
            return this;
        },


        parseValues: function(){

            var value = 0;
 
            var urlValues = this.model.get( 'urlValues');
            this.model.set( 'slug', urlValues[ value ] );

            this.pages[ this.model.get( 'slug' ) ].update( urlValues );
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


            this.listenTo( this.model, 'change:pageColour' , this.changeColour );

            // on urlValue change call pageView
            this.listenTo( this.model, 'change:urlValues' , this.parseValues );
 
            // this.nextPage( global.bootstrap.pageId );
            this.parseValues( this.model.get( 'urlValues' ) );
        },

        
        setColour: function( mouseover, urlValues ){

            var slug = urlValues[0];

            if( slug === global.bootstrap.sayhiSlug )
                return;

            var target;

            // if mouseover true - use menuItem slug as target colour
            // else if mouseout false - return colour to selected page
            target = ( mouseover ) ? slug : this.getter('slug');
 
            // use pageId to reference page & set pageColour
            _.each(this.collection.models, function( model ){
                if( model.get('slug') === target )
                    this.setter( 'pageColour', model.get('pageColour') );
            }, this );   

            return this;
        },


        changeColour: function(){
 
            $('body, .panel').css( 'background-color', this.getter('pageColour') );
        },

 

        doTransition : function(_model, val, opts) {
 
            // CSS Page transitions  
            // if first page load return
            if( this.model.get('firstPageLoad') ){ 
                this.model.set('firstPageLoad', false); 
                return false;
            } 

            this.transition.render( this.model.get('slug') );
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