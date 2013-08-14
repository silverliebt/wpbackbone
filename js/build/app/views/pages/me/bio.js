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

            this.nzbuilt = false;
            this.eubuilt = false;

            this.render(); 
        },


        render : function(){

            var that = this, 
                $readon = this.$el.find('.readon'),
                $bio = this.$el.find('.content'),
                originalText = $bio.html(),
                truncText = $bio.find('p:first-child, p:nth-child(2), p:nth-child(3)');

            $bio.html( truncText );

            $readon.on('click', function(){ 

                // if expanded abridge and vice versa
                if( that.expanded ){

                    originalText = $bio.html();

                    $('.current-page .scrollpane').scrollTo( $('.bio') ); 
                    $bio.html(truncText);
                    $(this).html('Read on');
                    that.expanded = false;

                } else {
                    $bio.html(originalText);
                    $(this).html('Abridge');
                    that.expanded = true;
                } 
            });

            // init count-up clock
            $('#sinceCountdown').countdown({
              since: new Date(2006, 6-1, 25), 
              format: 'YDHM',
              layout: '<div class="countdown_amount">{yn}<span class="label">{yl}</span> {dn}<span class="label">{dl}</span> {hn}<span class="label">{hl}</span> {mn}<span class="label">{ml}</span>',
              labels: ['y', '', '', 'd', 'h', 'm', '']
            });
        },


        buildNZ : function(){

            if( this.nzbuilt )
                return;

            console.log('built');

            $('#nz').lazylinepainter({
                "svgData": global.misc.lazylinedata,
                "strokeWidth": 2,
                "strokeColor": "#ebe5d3"
            }).lazylinepainter( ( global.smart.device ) ? 'stamp' : 'paint' ); 

            this.nzbuilt = true;
        },


        buildEU : function(){

            this.eubuilt = true;

            $('#nz').lazylinepainter({
                "svgData": global.misc.lazylinedata,
                "strokeWidth": 3,
                "strokeColor": "#743335"
            }).lazylinepainter( ( global.smart.device ) ? 'stamp' : 'paint' ); 
        } 
    });
    
    return BioView; 
}); 