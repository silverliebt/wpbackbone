define([ 'jquery'
        ,'global'
        ,'underscore'
        ,'backbone'
        ,'models/footer'
        ,'plugins'
        ,'utils/utils'
       ],function( $, global, _ , Backbone, FooterModel, Plugins, Utils ) {       
    
    
    //  The View for a Page 
    
    var FooterView = Backbone.View.extend({

        model: new FooterModel(),
         
        initialize: function(){
               
            _.bindAll(this);
            
            $('footer input').on('focus', function(){
                $(this).animateBG(150, 0, 1500);
            });

            $(".footer-social h1").lettering(); 

            this.$el.delay(500).fadeIn(500);
 
            global.handlers.resize.add({ 
                'id'      : 'footer',
                'callback': this.onresize 
            }); 
        },
        
        update: function( selected , urlValues ){

            var slug = urlValues[0];

            if( slug === global.bootstrap.sayhiSlug ) {

                if( this.getter('selected') )
                    this.close();
                else  
                    this.open();
 
            } else { 
                this.close();
            } 
                    

            var that = this;
            setTimeout(function(){
                
                var overflow = that.getter('selected') ? 'visible' : 'hidden';

                $('body, html').css({'overflow':overflow});
                that.$el.css({'position':'absolute'});

                $('.current-page .content-wrap').animate({'opacity': that.getter('contentOpacity') });

            }, 600);

            return this;
        },

        open: function(){

            this.$el.css({'top': 100 });

            this.setter( 'selected' , true ); 
            this.setter( 'contentOpacity' , 0 );
            this.$el.addClass( 'selected' ); 
        },
        
        close: function(){

            this.$el.css({'top':global.screen.height+2});
 
            this.setter( 'selected' , false ); 
            this.setter( 'contentOpacity' , 1 );
 
            this.$el.removeClass( 'selected' ); 
        },
 
        
        onresize : function () {
 
            var position = this.getter('selected') ? 100 : global.screen.height+2;
            
            this.$el.css({ 'top': position });
        },


        onMouseover : function( mouseover , urlValues, pageColour ){ 

            var slug = urlValues[0];
            
            // no mouseover if footer selected
            if( this.getter('selected') )
                return;

            // if this sayhi and mouseover is true animate waves
            if( slug === global.bootstrap.sayhiSlug && mouseover)
                $('.footer-top svg pattern').animateSvgBG( 500 );  // only animate on mouse over
             

            pageColour = slug === global.bootstrap.sayhiSlug ? '#3a4284' : pageColour;
                 
            var to = Utils.hex2rgba( pageColour, 1 );
            pageColour ='rgba('+to.rgba+')' ;   

            $('.footer-top svg path').css({'fill': pageColour});
            $('.footer-content').css({'background-color': pageColour});
            
            return true;
        },


        getter : function( value ){ 
            return this.model.get( value );
        },

        setter : function( target , value ){ 
            this.model.set( target , value );
        }
    });
    
    return FooterView;
});