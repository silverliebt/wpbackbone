/*
* Utilies / ResizeHandler
* - - - - - - - - - - - - - -
*/

define(['global'],function ( global ) {

    var resizeStack = [];

    var update = function () { 
        
        global.screen.height  = global.el.win.height();
        global.screen.width   = global.el.win.width(); 
        
        for (i = 0; i < resizeStack.length; i++){
            var item = resizeStack[i];
            item.callback( global.screen.width , global.screen.height );
 
        }
    },

    remove = function ( id ) { 

        resizeStack = $.grep( 
            resizeStack, function( item ) {
                if( item.id !== id )
                    return item;
            }   
        );

        //console.log( 'remove - '+id );
    },

    add = function( item ){

        // if resizeStack already holds resize item return false
        for (i = 0; i < resizeStack.length; i++){
            if( item.id === resizeStack[i].id )
                return false;
        }

        resizeStack.push( item );

        //console.log( 'add - '+item.id );
    };
        
    return {
        update  : update,
        remove  : remove,
        add     : add
    };
});