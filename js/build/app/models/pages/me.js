// Filename: models / pages / me
define([ 
    'models/pages/base'
], function( BasePageModel ){
  
    // Page Model
    var MeModel = BasePageModel.extend({
        defaults : {
            bio : {
                rendered : false,
                expanded : false
            },
            skillsRendered : false,
            instances : []
        } 
    });

    _.defaults( MeModel.prototype.defaults, BasePageModel.prototype.defaults );
    
    return MeModel;
});