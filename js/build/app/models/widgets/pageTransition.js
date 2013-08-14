// Filename: models / widgets / pagetransition
define([
    'underscore',
    'backbone',
    'plugins'

], function( _ , Backbone ){

    // For nested Transistion Model
    var Transition = Backbone.Model.extend({
        defaults: {
            types : 
            [   
                {   "outClass"  : 'pt-page-moveToLeft',
                    "inClass"   : 'pt-page-moveFromRight'
                },                
                {   "outClass"  : 'pt-page-moveToRight',
                    "inClass"   : 'pt-page-moveFromLeft'
                },
                {   "outClass"  : 'pt-page-moveToTop',
                    "inClass"   : 'pt-page-moveFromBottom'
                },                 
                {   "outClass"  : 'pt-page-moveToBottom',
                    "inClass"   : 'pt-page-moveFromTop'
                },
                {   "outClass"  : 'pt-page-rotateFall pt-page-ontop',
                    "inClass"   : 'pt-page-scaleUp'
                }
 
            ],
            support: false,
            isAnimating: false,
            endCurrPage: false,
            endNextPage: false,
            animEndEventNames: {
                'WebkitAnimation' : 'webkitAnimationEnd',
                'OAnimation' : 'oAnimationEnd',
                'msAnimation' : 'MSAnimationEnd',
                'animation' : 'animationend'
            },
            animEndEventName: ''
        }
    });
  



    // Pages Model
    var PagesModel = Backbone.Model.extend({
        
        initialize: function () {
            
            // Create Transition Model 
            this.set("transition", new Transition());

            // set animation end event name
            var animEndEventNames = this.get('transition').get('animEndEventNames');
            this.get('transition').set( 'animEndEventName', animEndEventNames[ Modernizr.prefixed( 'animation' )] );

            // set support css animations
            this.get('transition').set('support', Modernizr.cssanimations);
        }
    });
    
    return PagesModel;
});