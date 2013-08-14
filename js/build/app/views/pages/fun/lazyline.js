/*
* views / pages / fun / lazy
* - - - - - - - - - - - - - -
*/

define([ 'jquery'
        ,'global'
        ,'utils/utils'
        ,'underscore'
        ,'backbone'
        ,'plugins'
       ],function( $ , global, Utils, _ , Backbone  , Plugins) {       
    
     
    var LazylineView = Backbone.View.extend({
 
 
        initialize: function(){

            _.bindAll(this); 

            this.rendered = false; 

            this.lazylineHandler = [];

            this.index = 0;

            this.arrows = true;

            this.$container = this.$el.find('.container');

            // used to add unique media queries to container
            this.currentClass = 'guy';

            this.applyline = ( global.smart.phone ) ? 'stamp' : 'paint';
        },


        render : function(){

            this.rendered = true; 

            var that = this;
 
            this.demos = [ 
                function(){
                    
                    // append element with unique id
                    that.$container.append('<div id="ll-guy" />');
                    
                    // id must must the "ll-guy" dataset found in the svgData obj
                    $("#ll-guy").lazylinepainter({ 
                        'svgData' : global.misc.lazylinedata, 
                        'strokeWidth':2, 
                        'strokeColor':'#44443f',
                        'scale':{
                            'container' : that.$container,
                            'center':true
                        }
                    }).lazylinepainter( that.applyline );
                    
                    that.$container.append('<div id="ll-chair" />');
                    $("#ll-chair").lazylinepainter({
                        'svgData' : global.misc.lazylinedata, 
                        'strokeWidth':2, 
                        'strokeColor':'#44443f', 
                        'delay':3000,
                        'scale':{
                            'container' : that.$container,
                            'center':true
                        }
                    }).lazylinepainter( that.applyline );
                     
                    that.lazylineHandler.push($("#ll-guy"),$("#ll-chair"));

                    that.currentClass = 'guy';
                    
                }, 
                function(){
                
                    that.$container.append('<div id="ll-face" />');
                    $("#ll-face").lazylinepainter({ 
                        'svgData' : global.misc.lazylinedata,
                        'strokeWidth':7, 
                        'strokeColor':'#44443f',
                        'scale':{
                            'container' : that.$container,
                            'center' : true
                        },
                        'onComplete' : function(){
                                $(this).animate({'top':-30},500);
                            }   
                    }).lazylinepainter( that.applyline );
                    
                    that.lazylineHandler.push($("#ll-face"));

                    that.currentClass = 'face';
                }, 
                function(){
                
                   that.$container.append('<div id="ll-vertical-grid" />');
                    $('#ll-vertical-grid').lazylinepainter({
                            'svgData' : global.misc.lazylinedata,
                            'strokeWidth':1,  
                            'strokeColor':'#fefbf2',
                            'scale':{
                                'container' : that.$container,
                                'center' : true
                            }
                        }
                    ).lazylinepainter( that.applyline );
                    
                    that.$container.append('<div id="ll-horizontal-grid" />');
                    $('#ll-horizontal-grid').lazylinepainter({
                            'svgData' : global.misc.lazylinedata,
                            'strokeWidth':1,  
                            'strokeColor':'#fefbf2',
                            'scale':{
                                'container' : that.$container,
                                'center' : true
                            }
                        }
                    ).lazylinepainter( that.applyline );
                    
                    that.$container.append('<div id="ll-shape" />');
                    $('#ll-shape').lazylinepainter({
                            'svgData' : global.misc.lazylinedata,
                            'strokeWidth':2,  
                            'strokeColor':'#44443f',
                            'delay':5000,
                            'scale':{
                                'container' : that.$container,
                                'center' : true
                            } 
                        }
                    ).lazylinepainter( that.applyline );
                    
                    that.lazylineHandler.push($('#ll-vertical-grid'),$('#ll-horizontal-grid'),$('#ll-shape'));

                    that.currentClass = 'shape';
                }
            ];  
            
            this.demos[this.index](); 
            this.$container.addClass( this.currentClass );
            
            this.enable();
        },


        enable : function(){

            var that = this;

            this.$el.addClass('reveal'); 
        },


        disable : function(){ 
            this.$el.removeClass('reveal'); 
        },


        next : function(){

            this.clear();

            if( this.index == (this.demos.length-1) )
                this.index = 0;
            else
                this.index++;

            this.update();
        },


        prev : function(){

            this.clear();

            if( this.index == 0 )
                this.index = this.demos.length-1;
            else
                this.index--;

            this.update();
        },


        clear : function(){
            $.each( this.lazylineHandler, function(index,value){
                value.lazylinepainter('destroy');
            }); 

            this.lazylineHandler = []; 
        },


        update : function(){
            this.$container.removeClass( this.currentClass );
            this.demos[ this.index ]();
            this.$container.addClass( this.currentClass );
        }
    });
    
    return LazylineView; 
}); 