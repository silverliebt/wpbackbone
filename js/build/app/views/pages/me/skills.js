/*
* views / pages / me / skills
* - - - - - - - - - - - - - -
*/

define([ 'jquery'
        ,'global'
        ,'underscore'
        ,'backbone'
        ,'plugins'
       ],function( $ , global, _ , Backbone , Plugins) {       
    
     
    var SkillsView = Backbone.View.extend({
 
 
        initialize: function(){

            _.bindAll(this);

            this.rendered = false;
            this.isandriod = false; // Andriod workaround

            this.detect();
        },


        render : function(){

            this.rendered = true;

            console.log('hi');

            var that = this;
            
            $('.skills  .skill').each(function(){

                var percent = $(this).data('percent')

                if( that.isandriod ){
                    $(this).find('h2').text(percent);
                } else {
                    setPercent($(this), percent);
                    setCount($(this).find('h2'), percent);
                }
            });


            function setCount( $target , percent ){
              $({countNum: $target.text()}).animate({countNum: percent}, {
                duration: 1000,
                easing:'linear',
                step: function() {
                  $target.text(Math.ceil(this.countNum));
                }
              });
            }


            function setPercent( $target , percent ){
              
                var _percent = percent*10,
                    degrees = ( 360 * _percent )/100;

                if( degrees >= 180 ){
                    $target.find('.rightside .inner').css({
                    '-webkit-transform': 'rotate(180deg)',
                    '-moz-transform': 'rotate(180deg)',
                    '-ms-transform': 'rotate(180deg)',
                    '-o-transform': 'rotate(180deg)',
                    'transform': 'rotate(180deg)',
                    'opacity':1
                    })

                    $target.find('.leftside .inner').css({
                    '-webkit-transform': 'rotate('+degrees+'deg)',
                    '-moz-transform': 'rotate('+degrees+'deg)',
                    '-ms-transform': 'rotate('+degrees+'deg)',
                    '-o-transform': 'rotate('+degrees+'deg)',
                    'transform': 'rotate('+degrees+'deg)'
                    })
                    } else {
                    $target.find('.rightside .inner').css({
                    '-webkit-transform': 'rotate('+degrees+'deg)',
                    '-moz-transform': 'rotate('+degrees+'deg)',
                    '-ms-transform': 'rotate('+degrees+'deg)',
                    '-o-transform': 'rotate('+degrees+'deg)',
                    'transform': 'rotate('+degrees+'deg)',
                    'opacity':1
                    })
                }
            }

            return this;
        },


        detect : function(){
            var ua = navigator.userAgent.toLowerCase();
            
            if( ua.indexOf("android") > -1 ){
                this.$el.addClass('isandriod');
                this.isandriod = true;
            }
        }
    });
    
    return SkillsView; 
});  