// Filename: models/menu
define([
    'underscore',
    'backbone'
], function( _ , Backbone ){
  
    // Menu Model
    var MenuModel = Backbone.Model.extend({ 
        defaults : {
            selected: false,
            slug    : 'nothin',
            pageId  : 0,
            idAttr  : 'nothin',
            delay : 0,
            linkColour : '#fefbf1', // default to white
            sayhi: 'closed'
        }
    });
    
    return MenuModel;
});