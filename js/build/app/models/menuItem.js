// Filename: models/menu
define([
    'underscore',
    'backbone'
], function( _ , Backbone ){
  
    // Menu Model
    var MenuItemModel = Backbone.Model.extend({ 
        defaults : {
            selected: false,
            mouseover: false,
            slug    : 'nothin',
            pageId  : 0,
            idAttr  : 'nothin',
            delay : 0,
            linkColour : '#fefbf1', // default to white
            sayhi: 'closed'
        }
    });
    
    return MenuItemModel;
});