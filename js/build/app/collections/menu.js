// Filename: collections/menu

define([
  'underscore',
  'backbone',
  'models/menuItem'
], function( _ , Backbone , MenuItemModel ){
 
	var MenuCollection = Backbone.Collection.extend({
      
    model: MenuItemModel,

    initialize : function(models, options) {

      this.on( "change:selected", this.changeSelected ); 
    },

    changeSelected: function( model, val, opts ){
 
      if( val ){
        this.each( function( e ){
          if( e != model && e.get( "selected" ) ) {
            e.set( "selected", false );
          }
        });
      }
    }
  });

  return MenuCollection;
});