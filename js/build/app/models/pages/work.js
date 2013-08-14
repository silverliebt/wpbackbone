// Filename: models / pages / work
define([
    'underscore', 
    'models/pages/base'
], function( _ , BasePageModel ){
  
    // Page Model
    var WorkModel = BasePageModel.extend({
        defaults : { 

            instances : []
        }
    });
    
    _.defaults( WorkModel.prototype.defaults, BasePageModel.prototype.defaults );

    return WorkModel;
});