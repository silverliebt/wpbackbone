// Filename: models / pages / fun
define([
    'underscore', 
    'models/pages/base'
], function( _ , BasePageModel ){
   
    var FunModel = BasePageModel.extend({
        defaults : {  
            instances : []
        }
    });
    
    return FunModel;
});