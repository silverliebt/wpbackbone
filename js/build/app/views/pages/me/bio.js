/*
* views / pages / me / bio
* - - - - - - - - - - - - - -
*/

define([ 'jquery'
        ,'global'
        ,'utils/utils'
        ,'underscore'
        ,'backbone'
        ,'plugins'
       ],function( $ , global, Utils, _ , Backbone  , Plugins) {       
    
     
    var BioView = Backbone.View.extend({
 
 
        initialize: function(){

            _.bindAll(this); 

            //this.rendered = false;

            this.expanded = false;

            // this.nzbuilt = false;
            // this.eubuilt = false;
 
        },


        render : function(){

            this.$countdown     = $('#sinceCountdown');
            this.$readon        = this.$el.find('.readon');
            this.$bio           = this.$el.find('.content');
            this.originalText   = this.$bio.html();
            this.truncText      = this.$bio.find('p:first-child, p:nth-child(2), p:nth-child(3)');

            this.$bio.html( this.truncText );
        },

        
        enable : function(){
          
            this.$readon.on( 'click', this.toggleText );

            // init count-up clock
            this.$countdown.countdown({
              since: new Date(2006, 6-1, 25), 
              format: 'YDHM',
              layout: '<div class="countdown_amount">{yn}<span class="label">{yl}</span> {dn}<span class="label">{dl}</span> {hn}<span class="label">{hl}</span> {mn}<span class="label">{ml}</span>',
              labels: ['y', '', '', 'd', 'h', 'm', '']
            });
        },


        disable : function(){ 

            this.$readon.off();
            this.$countdown.countdown('destroy');
        },


        toggleText : function(){ 

            // if expanded abridge and vice versa
            if( this.expanded ){

                this.originalText = this.$bio.html();

                $('.current-page .scrollpane').scrollTo( $('.bio') ); 
                this.$bio.html( this.truncText );
                this.$readon.html('Read on');
                this.expanded = false;

            } else {
                this.$bio.html( this.originalText );
                this.$readon.html('Abridge');
                this.expanded = true;
            }  
        }


        // ,


        // buildNZ : function(){

        //     if( this.nzbuilt )
        //         return;

        //     console.log('built');

        //     $('#nz').lazylinepainter({
        //         "svgData": global.misc.lazylinedata,
        //         "strokeWidth": 2,
        //         "strokeColor": "#ebe5d3"
        //     }).lazylinepainter( ( global.smart.device ) ? 'stamp' : 'paint' ); 

        //     this.nzbuilt = true;
        // },


        // buildEU : function(){

        //     this.eubuilt = true;

        //     $('#nz').lazylinepainter({
        //         "svgData": global.misc.lazylinedata,
        //         "strokeWidth": 3,
        //         "strokeColor": "#743335"
        //     }).lazylinepainter( ( global.smart.device ) ? 'stamp' : 'paint' ); 
        // } 
    });
    
    return BioView; 
}); 