/*
* views / pages / sayhi
* - - - - - - - - - - - - - -
*/
define([ 'jquery'
        ,'global'
        ,'underscore' 
        ,'plugins'
        ,'models/pages/sayhi'
        ,'views/pages/base'
       ],function( $, global, _ , Plugins, SayhiModel, BasePageView ) {       
     
    
    var SayHi = BasePageView.extend({

        model: new SayhiModel(),

        initialize: function(){
            _.bindAll(this);
        },

        render: function(){ 
 
            this.logo();

            return this;
        },
 

        logo : function () {

            $('#logo-sayhi').lazylinepainter({
            "svgData": global.misc.lazylinedata,
            "strokeWidth": 7,
            "scale" : {
                "container" : $('#logo-sayhi-holder')
            }, 
            "strokeColor": "#56b990"
            }).lazylinepainter('paint');
        }
    });
    
    return SayHi;
});