define([ 'jquery'
        ,'global'
        ,'underscore'
        ,'backbone'
        ,'utils/utils'
        ,'views/pages/home'
        ,'views/pages/me'
        ,'views/pages/sayhi'
        ,'views/pages/work'
        ,'views/pages/fun'
       ],function( $, global, _ , Backbone, utils, Home, Me, SayHi, Work, Fun) {       
    
    
    //  The View for a Page 
    
    var PageView = Backbone.View.extend({
        
        events: {},    

        tagName: 'section',
        
        attributes: { class:  "page" },
        
        initialize: function(){ 
 
            _.bindAll(this);

            this.slug = this.getter('slug');

            this.$el.attr('id', this.slug ); 
            
            this.view = {}; 
        },


        setView : function(){  

            switch( this.slug ) {
                case 'home': 
                    this.view = new Home({el : $('#home')});
                    break;
                case 'me':
                    this.view = new Me({el : $('#me')});
                    break;
                case 'say-hi':
                    this.view = new SayHi({el : $('#say-hi')});
                    break;
                case 'work':
                    this.view = new Work({el : $('#work')});
                    break;
                case 'fun':
                    this.view = new Fun({el : $('#fun')});
                    break;
            }
        },
        
 
        update: function( urlValues ){ 

            this.setter( 'urlValues' , urlValues );

            var loaded      = this.getter('loaded'),
                rendered    = this.getter('rendered'); 
 
            if( loaded )
                if( rendered )
                    this.refresh();
                else
                    this.render();
            else
                this.loadPage(); 
            
            return this;
        },


        render: function(){ 

            var that = this;

            this.setter( 'rendered' , true );

            this.view.setter( 'urlValues' , this.getter('urlValues') );

            this.listenTo( this.model, 'change:current', this.current ); 

            // give the transition time do its thing
            setTimeout(function(){
                that.view.render();
                that.refresh(); 
            }, ( global.firstPageLoad ) ? 0 : 2000 );

        },
        
 
        
        refresh : function(){ 


            $('.current-page .inner').fadeIn(500);

            $('body').removeClass();
            $('body').addClass(this.getter('slug'));
 
            // used to trigger transition from PagesView
            this.setter('current',true);
            
            this.saveUrl();

            this.setTitle();

            this.setFavicon();
        },
        


        saveUrl : function(){

            var slug = this.getter( 'slug' ); 

            if( !global.firstPageLoad )
                Backbone.history.navigate( ( slug === 'home' ) ? '' : slug );
            else 
                global.firstPageLoad = false;
        },
          

         
        loadPage : function( options ){

            this.beforeLoad();
            
            var url = global.url + '/' + this.getter('slug'),
                that = this;   

            $.get( url , function( data ) {  

                var response = $(data);
                response = response.find('.page > .inner');

                that.setter( 'loaded' , true );
                that.$el.html( response ); 

                that.afterLoad();
            });
        },



        beforeLoad : function(){
 
            $('.preloader').fadeIn(500); 
            $('.current-page .inner').fadeOut(500);
        },



        afterLoad : function( onComplete ){
 
            $('.preloader').fadeOut(500); 

            this.render();
        },



        // Enable / Disable pages 
        current : function( _model, val, opts ){
  
            if( val )
                this.view.enable();
            else
                setTimeout( this.view.disable , 500 ); // disable approx after transition
        },
 
  
        getter : function( value ){ 
            return this.model.get( value );
        },


        setter : function( target , value ){ 
            this.model.set( target , value );
        },


        setFavicon : function() { 

            $('head link[type="image/x-icon"]').remove();

            var link = document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = this.getter('faviUrl');
            document.getElementsByTagName('head')[0].appendChild(link);
          
        },


        setTitle : function(){

            var pageTitle = this.getter('slug').replace('-',' ');
            pageTitle = 'Cam ~ '+pageTitle.capitalize()+'!';
            document.title = pageTitle;
        },
    });

    return PageView;
});