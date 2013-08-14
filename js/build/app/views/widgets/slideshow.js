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
 
 
        initialize: function(){

            _.bindAll(this); 

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

            this.onresize();

            //this.enable();

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
                direction = this.direction( $this ),
                position = this.$mover.position();

            if( $this.hasClass('disabled') || this.animating )
                return;
 
            position = ( direction === 'left' ) ? (position.left + 20) : (position.left -20);
 
            this.$mover.addClass('speedup');
            this.$mover.css('left', position);
        },


        onmouseout : function( e ){ 
            var $this = $(e.currentTarget),
                direction = this.direction( $this );

            if( $this.hasClass('disabled') || this.animating )
                return;
 
            this.onresize();
        }, 


        onclick : function( e ){ 

            var $this = $(e.currentTarget),
                direction = this.direction( $this ),
                that = this;

            if( $this.hasClass('disabled') || this.animating )
                return;

            this.$mover.removeClass('speedup');
            
            this.nextSlide( direction );

            if( direction === 'left' ) {
 
                if( this.current_slide === 1)
                    $this.addClass('disabled');

                this.$right.removeClass('disabled'); 
            } else {
   
                if( this.current_slide === this.num_of_slides )
                    $this.addClass('disabled');

                this.$left.removeClass('disabled'); 
            }
 
            this.onresize();
        }, 
 

        nextSlide : function( direction ){

            var that = this;

            this.animating = true;
   
            if( direction === 'left' ) {

                // left
                this.current_slide--;
 
            } else {
 
                // right
                this.current_slide++;
            }

            setTimeout(function(){ that.animating = false },1500 );
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
                this.$left.on('mouseover', this.onmouseover ).on('mouseout', this.onmouseout );
                this.$right.on('mouseover', this.onmouseover ).on('mouseout', this.onmouseout );
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

                    that.nextSlide( opposite );

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