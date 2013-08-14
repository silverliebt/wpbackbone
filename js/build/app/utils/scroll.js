/*
* Utilies / scrollHandler
* - - - - - - - - - - - - - -
*/

define([ 'jquery' ],function ( $ ) {

    var scrollStack = [],
    scrollDirection = 0,
    scrollTop = $(this).scrollTop(),
    update = function () {
         
        scrollTop = $(this).scrollTop();

        for (i = 0; i < scrollStack.length; i++) {
            var item = scrollStack[i].callback;
  
            if (item.start && scrollTop < item.start) continue;
            if (item.end && scrollTop > item.end) continue;
            if (item.condition && !item.condition(scrollTop, scrollDirection)) continue;
    
            item.callback(scrollTop, scrollDirection);
        }
    },

    add = function( item ) {
        scrollStack.push( item );
    },

    remove = function ( id ) { 
        scrollStack = $.grep( 
            scrollStack, function( item ) {
                if( item.id !== id )
                    return item;
            }   
        );
    };
        
    return {
        update  : update,
        remove  : remove,
        add     : add
    };
});