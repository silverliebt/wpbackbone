/*
 * Utilies 
 * - - - - - - - - - - - - - -
 */
 
define(['jquery', 'underscore', 'plugins'], function($, _ ) {
    
  // Animate standard bg images
  $.fn.animateBG = function(x, y, speed) {
      var pos = this.css('background-position').split(' ');
      this.x = pos[0] || 0,
      this.y = pos[1] || 0;
      $.Animation( this, {
          x: x,
          y: y
        }, { 
          duration: speed
        }).progress(function(e) {
            this.css('background-position', e.tweens[0].now+'px '+'bottom');
      });
      return this;
  };

  // Animate svg bg pattern
  $.fn.animateSvgBG = function( speed ) {

    if( this.data("animateSvg") )
      return;

    this.data("animateSvg", true);

    var count = 1,
        interval = 20,
        duration  = Math.round( speed / (interval/2) ), 
        dist,
        that = this,
        intervalID = setInterval(function(){
       
        dist = 3*count;

        that.attr('x', dist);
        count++; 
               
        if(count === duration)
          killAnimation();

      }, interval);

    function killAnimation(){ 
      clearInterval( intervalID ); 
      that.data("animateSvg", false);
    }
          
    return this;
  };


  var hex2rgba = function( hex , opacity ) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        rgba: parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16) + ", " + opacity
    } : null;
  }; 


  String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
  };


  var truncText = function(text, maxLength, ellipseText){

        ellipseText = ellipseText || '&hellip;';
       
        if (text.length < maxLength) 
            return text;
 
        //Find the last piece of string that contain a series of not A-Za-z0-9_ followed by A-Za-z0-9_ starting from maxLength
        var m = text.substr(0, maxLength).match(/([^A-Za-z0-9_]*)[A-Za-z0-9_]*$/);
        if(!m) return ellipseText;
        
        //Position of last output character
        var lastCharPosition = maxLength-m[0].length;
        
        //If it is a space or "[" or "(" or "{" then stop one before. 
        if(/[\s\(\[\{]/.test(text[lastCharPosition])) lastCharPosition--;
        
        //Make sure we do not just return a letter..
        return (lastCharPosition ? text.substr(0, lastCharPosition+1) : '') + ellipseText;
      }
 
      
  return {
      hex2rgba : hex2rgba,
      truncText : truncText
  }; 
});