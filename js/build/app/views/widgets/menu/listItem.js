define([ 'jquery'
        ,'global'
        ,'underscore'
        ,'backbone'
        ,'models/MenuItem' 
       ],function( $, global, _ , Backbone, MenuItemModel) {       
    
    
    //  The View the Menu 
    
    var MenuItemView = Backbone.View.extend({

        model : new MenuItemModel(),

        events : {
            'click a': 'selected' 
        },


        initialize: function(){
               
            _.bindAll(this); 

            // Render on content change
            this.listenTo( this.model , 'change:selected' , this.update );


            this.render();
        },


        update : function (e) { 
 
            if(e.get('selected'))
                this.$el.addClass('current-menu-item current_page_item');
            else
                this.$el.removeClass('current-menu-item current_page_item');
        },


        selected : function (e) { 

            e.preventDefault();

            if( global.misc.isAnimating )
                return;
            
            this.model.set('selected', true);
        },
 
  
 
        render : function(){
 
            return this;
        } 
    });

    
    return MenuItemView;
});