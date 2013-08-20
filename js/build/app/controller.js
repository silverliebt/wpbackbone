// Filename: controller
define([
  'jquery',
  'global',
  'underscore',
  'backbone',
  'views/pages',
  'views/widgets/menu/controller',  
  'utils/resize', 
  'utils/scroll',
  'collections/menu'
], function( $ , global, _ , Backbone, PagesView, MenuView, resizeHandler, scrollHandler, MenuCollection ){

  var Controller = Backbone.View.extend({

    initialize: function(){  
       _.bindAll(this);
    },

    onReady: function(){

      // Initialize Resize
      global.handlers.resize = resizeHandler;
      global.el.win.resize( _.throttle( global.handlers.resize.update, 200 ) );   

      // Initialize Scroll
      global.handlers.scroll = scrollHandler;          

      // apply either paint or stamp according to device used
      global.misc.applyline = ( global.smart.device ) ? 'stamp' : 'paint';
 
      // Menu View 
      this.menuView = new MenuView({ el: $('#site-navigation')});

      // Menu Collection  
      this.menuCollection = new MenuCollection( this.menuView.getItems() );
      this.menuView.setCollection( this.menuCollection );
      this.listenTo( this.menuCollection, 'change:selected' , this.menuSelect );

      // Pages view
      this.pagesView = new PagesView({ el: $('article#content') }); 
  
      // call resize after init Views
      global.handlers.resize.update();
 
      return this;
    },
 

    menuSelect: function( e ){

      var urlValues = e.get('urlValues');  

      this.update( urlValues ); 
    },


    // Update page state - called by menuSelect() & router
    update: function( urlValues ){
      
      this.pagesView.nextPage( urlValues );

      return this;
    }

  });

  return Controller;

});