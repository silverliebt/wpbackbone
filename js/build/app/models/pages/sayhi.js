// Filename: models / pages / work
define([
    'underscore', 
    'models/pages/base'
], function( _ , BasePageModel ){
  
    // Page Model
    var SayhiModel = BasePageModel.extend({
        defaults : { 

            instances : []
        }
    });

    _.defaults( SayhiModel.prototype.defaults, BasePageModel.prototype.defaults );
    
    return SayhiModel;
});