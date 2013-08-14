define([
  'jquery', 
  'controller',
  'router'
], function( $ , Controller , Router ){
  
  var initialize = function(){
 
    var that = this; 
    
    this.controller = new Controller({ el: $('body') });

    $(document).ready(function() { 

      that.controller.onReady(); 

      // Pass in our Router module, pass controller
      Router.initialize( that.controller );
    });
  };

  return { initialize: initialize };
});