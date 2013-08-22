// Filename: models/pages
define([
    'underscore',
    'backbone'
], function( _ , Backbone ){
 


    // Pages Model
    var PagesModel = Backbone.Model.extend({
        defaults : {
            urlValues: [], // ie - [ fun , lazyline ]
            slug: '',
            firstPageLoad : true
        }
    });
    
    return PagesModel;
});