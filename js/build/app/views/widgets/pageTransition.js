/*
* views / widgets / pageTransition
* - - - - - - - - - - - - - -
*/

define([ 'jquery'
        ,'global'
        ,'underscore'
        ,'backbone'
        ,'models/widgets/pageTransition'
       ],function( $ , global,  _ , Backbone, PageTransitionModel ) {       
    
    
    //  The View the Pagination 
    var PageTransitionView = Backbone.View.extend({

        model: new PageTransitionModel(),

        initialize : function(){

            _.bindAll(this);
        },

        render : function( slug ){
    
            // if already animating or if selected value is false return
            // if( this.model.get('transition').get('isAnimating') ) 
            if( global.misc.isAnimating ) 
                return false;  
 

            // begin animation - - - - - - - 

            global.misc.isAnimating = true;
 
            var transitions = this.model.get('transition').get('types'), // array of CSS transitions classnames
                animEndEventName = this.model.get('transition').get('animEndEventName'), 
                that        = this,
                $currPage   = $('.current-page'),
                $nextPage   = this.pages[ slug ].$el.addClass( 'current-page' ),
                target      = Math.floor( Math.random() * transitions.length),
                outClass    = transitions[ target ].outClass, 
                inClass     = transitions[ target ].inClass;
 
            $currPage.addClass( outClass ).on( animEndEventName, function() {

                $currPage.off( animEndEventName  );
                that.model.get('transition').set('endCurrPage', true);

                if( that.model.get('transition').get('endNextPage') )
                    that.onEndAnimation( $currPage, $nextPage );
            });
            

            $nextPage.addClass( inClass ).on( animEndEventName, function() { 
                 
                $nextPage.off( animEndEventName );
                that.model.get('transition').set('endNextPage', true);

                if( that.model.get('transition').get('endCurrPage') )
                    that.onEndAnimation( $currPage, $nextPage );
            } );  

            if(!this.model.get('transition').get('support'))
                this.onEndAnimation( $currPage, $nextPage );

        },
        
        onEndAnimation : function( $outpage, $inpage ) {

            this.model.get('transition').set('endCurrPage', false);
            this.model.get('transition').set('endNextPage', false);
            this.resetPage( $outpage, $inpage );
            global.misc.isAnimating =  false;
        },
        
        resetPage : function( $outpage, $inpage ) {

            $outpage.attr( 'class', 'page background' );
            $inpage.attr( 'class', 'page background current-page' ); 
        },


        setPages : function( pages ){

            // list of pages
            this.pages = pages;
        },

        
        getter : function( value ){ 
            return this.model.get( value );
        },

        setter : function( target , value ){ 
            this.model.set( target , value );
        }
    });
    
    return PageTransitionView;
});