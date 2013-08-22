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
        ,'views/pages/page'
       ],function( $, global, _ , Plugins, SayhiModel, BasePageView, PageView ) {       
     
    
    var SayHi = PageView.extend({

        //model: new SayhiModel(),

        initialize: function( options ){

            // call PageView setAttributes
            this.setAttributes( options );

            _.bindAll(this);

        },


        // render called in PageView, after page loaded build is called
        build: function(){ 
 
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