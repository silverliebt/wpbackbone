// Filename: collections/pages
define([
  'underscore',
  'global',
  'backbone',
  'models/project'
], function( _ , global, Backbone , ProjectModel ){
 
	var PagesCollection = Backbone.Collection.extend({
      
      model: ProjectModel,

      initialize : function() {  

      //  this.on( "change:current", this.changeSelected );
      },
      
      
      url : function() {
        return global.url+'/?json=get_post_index';
      },
    
      
      // parse : function( results ) { 

      //   //var filteredResults = this.filterResults( data );
      //   return filteredResults;
      // },
      

      filterResults: function( results ) {
 
        var filteredResults = []; 

        _.each( results.posts , function( posts ){
 
          filteredResults.push( this.applyFilter( posts ) );
        }, this );

        return filteredResults;
      },


      applyFilter : function( results ){

        return {
          id      : results.id, 
          slug    : results.slug,
          url     : this.parseUrl( results.url ),
          title   : results.title,
          content     : results.content,
          date        : this.parseDate( results.date ),
          categories  : results.categories,
          linkColour  : results.acf.link_colour,
          pageColour  : results.acf.page_colour
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


      parseDate :  function( results ){

        

        return childrenIds;
      },


      parseUrl :  function( results ){

        

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

  return ProjectModel;
});