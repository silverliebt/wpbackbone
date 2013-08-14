// Filename: models/footer
define([
    'jquery',
    'underscore',
    'backbone'
], function( $, _ , Backbone ){
  
    // Page Model
    var FooterModel = Backbone.Model.extend({
        defaults : {
            selected : false,
            contentOpacity : 1
        }
    });
    
    return FooterModel;
});