// Filename: models/pages
define([
    'underscore',
    'backbone'
], function( _ , Backbone ){
 


    // Pages Model
    var PagesModel = Backbone.Model.extend({
        defaults : {
            urlValues: [], // ie - [ journal , training ]
            slug: '',
            firstPageLoad : true,
            pageColour: '#3a4284'
        }
    });
    
    return PagesModel;
});