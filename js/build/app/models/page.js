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
            animationType:'',
            originalClassList: '',
            faviUrl : '',
            urlValues : []
        },

        parse: function( data ){

            if(data.slug === 'sample-page')
                data.slug = 'home';

            return data;
        } ,
        // used to push new obj's into instance stack ,
        // we loop through these objs and disable / enable them when needed
        // ie - the custom scrollbar on each page
        addInstance : function( item ){
            var instances = this.get('instances');
            instances.push( item );
            this.set( 'instances' , instances ); 
        },

        initialize: function(){
            var instances = [];
            this.set('instances',instances);
        }
    });

    //_.defaults( PageModel.prototype.defaults, BaseModel.prototype.defaults );
    
    return  PageModel;
});