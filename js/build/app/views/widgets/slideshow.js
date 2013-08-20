/*
* views / widgets / slideshow
* - - - - - - - - - - - - - -
*/

define([ 'jquery'
        ,'global'
        ,'underscore'
        ,'backbone' 
        ,'plugins'
       ],function( $ , global, _ , Backbone , Plugins ) {       
    
     
    var SlideShow = Backbone.View.extend({
 
 
        initialize: function(  ){

            _.bindAll(this);  

            this.$el.prepend('<div class="total-slides" /><div class="hotspot"><div class="left disabled" /><div class="right"/></div>');
            this.$el.find('.right').append('<div class="arrow"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width="70" height="126" viewBox="0" enable-background="new 0 0 70 126" xml:space="preserve"><path fill="#010101" d="M8.5 122.1c-1 0-2-0.4-2.8-1.2 -1.6-1.6-1.6-4.1 0-5.7 1.2-1.2 1.2-2 1.3-3.9 0.1-2.4 0.3-5.8 3.6-9.1s6.7-3.5 9.1-3.6c1.9-0.1 2.7-0.1 3.9-1.3 1.1-1.1 1.2-2 1.3-3.9 0.1-2.4 0.3-5.8 3.6-9.1 3.3-3.3 6.7-3.5 9.1-3.6 1.9-0.1 2.7-0.1 3.9-1.3 1.1-1.1 1.2-2 1.3-3.9 0.1-2.4 0.3-5.8 3.6-9.1 2.9-2.9 6.9-3.4 9.9-3.8 0.7-0.1 1.6-0.2 2.2-0.3 -0.7-0.1-1.6-0.2-2.3-0.3 -2.9-0.4-6.9-0.8-9.9-3.8 -3.3-3.3-3.5-6.7-3.6-9.1 -0.1-1.9-0.2-2.7-1.3-3.9 -1.2-1.2-2-1.2-3.9-1.3 -2.4-0.1-5.8-0.3-9.1-3.6 -3.3-3.3-3.5-6.7-3.6-9.1 -0.1-1.9-0.2-2.7-1.3-3.9 -1.2-1.2-2-1.2-3.9-1.3 -2.4-0.1-5.8-0.3-9.1-3.6 -3.3-3.3-3.5-6.7-3.6-9.1 -0.1-1.9-0.2-2.7-1.3-3.9 -1.6-1.6-1.6-4.1 0-5.7 1.6-1.6 4.1-1.6 5.7 0 3.3 3.3 3.5 6.7 3.6 9.1 0.1 1.9 0.2 2.7 1.3 3.9 1.2 1.2 2 1.2 3.9 1.3 2.4 0.1 5.8 0.3 9.1 3.6 3.3 3.3 3.5 6.7 3.6 9.1 0.1 1.9 0.2 2.7 1.3 3.9 1.2 1.2 2 1.2 3.9 1.3 2.4 0.1 5.8 0.3 9.1 3.6 3.3 3.3 3.5 6.7 3.6 9.1 0.1 1.9 0.2 2.7 1.3 3.9 1 1 3.1 1.3 5.2 1.5 3.2 0.4 9.8 1.2 9.8 8.3 0 7.1-6.6 7.9-9.8 8.3 -2.1 0.2-4.2 0.5-5.2 1.5 -1.1 1.1-1.2 2-1.3 3.9 -0.1 2.4-0.3 5.8-3.6 9.1 -3.3 3.3-6.6 3.5-9.1 3.6 -1.9 0.1-2.7 0.1-3.9 1.3 -1.1 1.1-1.2 2-1.3 3.9 -0.1 2.4-0.3 5.8-3.6 9.1 -3.3 3.3-6.6 3.5-9.1 3.6 -1.9 0.1-2.7 0.1-3.9 1.3 -1.1 1.2-1.2 2-1.3 3.9 -0.1 2.4-0.3 5.8-3.6 9.1C10.5 121.8 9.5 122.1 8.5 122.1z"/></svg></div>');
            this.$el.find('.left').append('<div class="arrow"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width="70" height="126" viewBox="0" enable-background="new 0 0 70 126" xml:space="preserve"><path fill="#010101" d="M62.7 2.7c1 0 2 0.4 2.8 1.2 1.6 1.6 1.6 4.1 0 5.7 -1.2 1.2-1.2 2-1.3 3.9 -0.1 2.4-0.3 5.8-3.6 9.1s-6.6 3.5-9.1 3.6c-1.9 0.1-2.7 0.1-3.9 1.3 -1.1 1.1-1.2 2-1.3 3.9 -0.1 2.4-0.3 5.8-3.6 9.1 -3.3 3.3-6.6 3.5-9.1 3.6 -1.9 0.1-2.7 0.1-3.9 1.3 -1.1 1.1-1.2 2-1.3 3.9 -0.1 2.4-0.3 5.8-3.6 9.1 -2.9 2.9-6.9 3.4-9.9 3.8 -0.7 0.1-1.6 0.2-2.2 0.3 0.7 0.1 1.6 0.2 2.3 0.3 2.9 0.4 6.9 0.8 9.9 3.8 3.3 3.3 3.5 6.7 3.6 9.1 0.1 1.9 0.2 2.7 1.3 3.9 1.2 1.2 2 1.2 3.9 1.3 2.4 0.1 5.8 0.3 9.1 3.6 3.3 3.3 3.5 6.7 3.6 9.1 0.1 1.9 0.2 2.7 1.3 3.9 1.2 1.2 2 1.2 3.9 1.3 2.4 0.1 5.8 0.3 9.1 3.6 3.3 3.3 3.5 6.7 3.6 9.1 0.1 1.9 0.2 2.7 1.3 3.9 1.6 1.6 1.6 4.1 0 5.7 -1.6 1.6-4.1 1.6-5.7 0 -3.3-3.3-3.5-6.7-3.6-9.1 -0.1-1.9-0.2-2.7-1.3-3.9 -1.2-1.2-2-1.2-3.9-1.3 -2.4-0.1-5.8-0.3-9.1-3.6 -3.3-3.3-3.5-6.7-3.6-9.1 -0.1-1.9-0.2-2.7-1.3-3.9 -1.2-1.2-2-1.2-3.9-1.3 -2.4-0.1-5.8-0.3-9.1-3.6 -3.3-3.3-3.5-6.7-3.6-9.1 -0.1-1.9-0.2-2.7-1.3-3.9 -1-1-3.1-1.3-5.2-1.5 -3.2-0.4-9.8-1.2-9.8-8.3 0-7.1 6.6-7.9 9.8-8.3 2.1-0.2 4.2-0.5 5.2-1.5 1.1-1.1 1.2-2 1.3-3.9 0.1-2.4 0.3-5.8 3.6-9.1 3.3-3.3 6.7-3.5 9.1-3.6 1.9-0.1 2.7-0.1 3.9-1.3 1.1-1.1 1.2-2 1.3-3.9 0.1-2.4 0.3-5.8 3.6-9.1 3.3-3.3 6.7-3.5 9.1-3.6 1.9-0.1 2.7-0.1 3.9-1.3 1.2-1.1 1.2-2 1.3-3.9 0.1-2.4 0.3-5.8 3.6-9.1C60.6 3.1 61.6 2.7 62.7 2.7z"/></svg></div>');
            this.$el.find('.slide').wrapAll('<div class="mover" />');

            this.dir = 'right';
            this.animating = false;
            this.current_slide = 1;
            this.num_of_slides = 0;
            this.$mover = this.$el.find('.mover');
            this.$left = this.$el.find('.left');
            this.$right = this.$el.find('.right');

            // set unique id, so we can find this resize instance and remove from resize stack
            var timestamp = new Date().getUTCMilliseconds();
            timestamp = 'slideshow-' + String(timestamp);
            this.id = timestamp;  

            if( global.smart.device )
                this.swipe();
        },


        render : function(){
 
            _.each(this.$el.find('.slide'), function(){
                this.num_of_slides++;
            }, this );

            if( this.num_of_slides === 1 )
                this.$right.addClass('disabled');
            else
                this.$right.fadeIn(500);

            this.onresize();

            return this;
        },


        onmouseenter : function(){ 

            if( this.current_slide === 1 )
                this.$el.addClass('reveal'); 
        },


        onmouseleave : function(){ 

            if( this.current_slide === 1 )
                this.$el.removeClass('reveal'); 
        },


        onmouseover : function( e ){ 
            var $this = $(e.currentTarget),
                position = this.$mover.position(),
                offset = 50;

            this.dir = this.direction( $this )

            if( $this.hasClass('disabled') || this.animating )
                return;
 
            position = ( this.dir === 'left' ) ? (position.left + offset) : (position.left - offset);
 
            this.$mover.addClass('speedup');
            this.$mover.css('left', position);
        },


        onmouseout : function( e ){ 

            var $this = $(e.currentTarget);

            if( $this.hasClass('disabled') || this.animating )
                return;
 
            this.onresize();
        }, 


        onclick : function( e ){ 

            var $this = $(e.currentTarget),
                that = this;

            this.dir = this.direction( $this );

            if( $this.hasClass('disabled') || this.animating )
                return;

            this.$mover.removeClass('speedup');

            this.beforeComplete();
            
            this.nextSlide();

            if( this.dir === 'left' ) {
 
                if( this.current_slide === 1){
                    $this.addClass('disabled');
                    $this.fadeOut(500);
                }

                this.$right.removeClass('disabled'); 
                this.$right.fadeIn(500);
            } else {
   
                if( this.current_slide === this.num_of_slides ){
                    $this.addClass('disabled');
                    $this.fadeOut(500);
                }

                this.$left.removeClass('disabled'); 
                this.$left.fadeIn(500);
            }
 
            this.onresize();
        }, 
 

        nextSlide : function(){

            var that = this;

            this.animating = true;
   
            if( this.dir === 'left' ) {

                // left
                this.current_slide--;
 
            } else {
 
                // right
                this.current_slide++;
            }

            setTimeout( function(){
                that.onComplete();
                that.animating = false;
            } ,1500 );
        },


        onComplete : function(){ 
            if( this.options.onComplete )
                this.options.onComplete( this.dir ); 
        },


        beforeComplete : function(){  
            if( this.options.beforeComplete )
                this.options.beforeComplete( this.dir ); 
        },


        onresize : function(){
 
            var that = this;

            this.$mover.css({'left': -(this.current_slide-1) * this.$el.outerWidth() });
            this.$mover.css({'width':this.num_of_slides * this.$el.outerWidth() });

            $.each(this.$el.find('.slide'), function(){
                $(this).css({'width':that.$el.outerWidth() });
            });

            $.each(this.$el.find('.video'), function(){
                $(this).fitVids();
            });
        },


        enable : function(){
  
            global.handlers.resize.add({ 
                'id'      : this.id,
                'callback': this.onresize 
            }); 


            if( global.smart.device ){ 
                this.$el.swipe("enable");
            } else {
                
                this.$left.on('click', this.onclick );
                this.$right.on('click', this.onclick );

                this.$el.on('mouseover', this.onmouseenter ).on('mouseout', this.onmouseleave); 
                this.$left.on('mouseenter', this.onmouseover ).on('mouseleave', this.onmouseout );
                this.$right.on('mouseenter', this.onmouseover ).on('mouseleave', this.onmouseout );
            }

            this.onresize();
        },


        disable : function(){
 
            global.handlers.resize.remove( this.id );

            if( global.smart.device ){ 
                this.$el.swipe("disable");
            } else {
                
                this.$el.off();
                this.$right.off();
                this.$left.off();
            }
        },

        
        direction : function( $target ){
            return ( $target.hasClass('left') ) ? 'left' : 'right';
        },


        totals : function( $target ){
            this.$el.find('');
        },


        swipe : function(){

            var that = this

            this.right = true;
            this.left = false;

            if( this.num_of_slides === 1 )
                this.right = false;

            this.$el.swipe({
                allowPageScroll : 'vertical',
                swipe:function(event, direction, distance, duration, fingerCount){

                    var opposite = ( direction === 'left' ) ? 'right' : 'left';

                    if( that.animating || that[opposite] === false )
                        return;

                    that.dir = opposite;

                    that.nextSlide();

                    if( opposite === 'left' ) {
         
                        if( that.current_slide === 1)
                            that.left = false;

                        that.right = true;
                    } else {
           
                        if( that.current_slide === that.num_of_slides )
                            that.right = false;

                        that.left = true;
                    }
         
                    that.onresize();
                },
                threshold:100
            }); 
        }
    });
    
    return SlideShow; 
});