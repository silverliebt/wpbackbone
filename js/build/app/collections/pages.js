// Filename: collections/pages
define([
  'underscore',
  'global',
  'backbone',
  'models/page'
], function( _ , global, Backbone , PageModel ){
 
	var PagesCollection = Backbone.Collection.extend({
      
      model: PageModel,

      initialize : function(models, options) {  

        this.on( "change:current", this.changeSelected );
      },
      
      
      url : function() {
        return global.url+'/?json=get_page_index';
      },
    
      
      parse : function(data) { 

        var filteredResults = this.filterResults( data );
        return filteredResults;
      },
      

      filterResults: function( results ) { 
 
        var filteredResults = []; 

        _.each( results.pages , function( pages ){
 
          filteredResults.push( this.applyFilter( pages ) );
        }, this );

        return filteredResults;
      },


      applyFilter : function( results ){
 
        return {
          title   : results.title,
          slug    : results.slug,
          pageId  : results.id,
          childrenIds : this.getChildrenIds( results ),
          acf         : results.acf,
          linkColour  : results.acf.link_colour,
          backgroundColor  : results.acf.background_color,
          attachments : results.attachments
        };
      },


      getPageId :  function( results ){

        if( results.children.length === 0 )
          return;

        var childrenIds = [];

        $.each( results.children, function(){
          childrenIds.push( this.id );
        }); 

        return childrenIds;
      },


      getChildrenIds :  function( results ){

        if( results.children.length === 0 )
          return;

        var childrenIds = [];

        $.each( results.children, function(){
          childrenIds.push( this.id );
        }); 

        return childrenIds;
      },
 

      changeSelected: function( model, val, opts ){
 
        if( val ){
          this.each( function( e ){
            if( e != model && e.get( "current" ) ) {
              e.set( "current", false ); 
            }
          });
        }
      }
  });

  return PagesCollection;
});