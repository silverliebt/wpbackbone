// Filename: models/page
define([
    'underscore',
    'backbone'
], function( _ , Backbone ){
  
    // Page Model
    var PageModel = Backbone.Model.extend({
        defaults : {
            current : false, // selected state
            loaded  : false, // loaded state
            firstLoad : true,
            rendered: false, // specific page view functionality initiated
            title   : 'none',
            slug    : 'none',
            pageId  : 0,
            acf     : '',
            content : 'none',
            linkColour : '#fefbf1', // default to light
            backgroundColor : '#3a4284',
            animationType:'',
            originalClassList: '',
            urlValues : []
        },

        parse: function( data ){
            if(data.slug === 'sample-page')
                data.slug = 'home';

            return data;
        }
    });
    
    return PageModel;
});