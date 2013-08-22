/*
* views / pages / home
* - - - - - - - - - - - - - -
*/
define([ 'jquery'
        ,'global'
        ,'underscore' 
        ,'plugins'
        ,'views/pages/page'
       ],function( $, global, _ , Plugins, PageView ) {


    var Home = PageView.extend({
 
      initialize: function( options ){
 
        // call PageView setAttributes
        this.setAttributes( options );

        _.bindAll(this);
 
        global.handlers.resize.add({ 
          'id'      : 'home',
          'callback': this.onresize 
        });

        this.setModel();
      },



      // render called in PageView, after page loaded build is called
      build: function(){ 
    
        this.logo(); 
  
        this.onresize();

        return this;
      }, 
  

      logo : function () {

        setTimeout(function(){
            var $horiLines = $('ul.grid.hori'),
                $vertLines = $('ul.grid.vert');
     
            for (var n = 0; n < 25; n++)
              $horiLines.append('<li class="line" />');

            for (var i = 0; i < 25; i++)
              $vertLines.append('<li class="line" />');

            $('ul.grid li.line').each(function(i,k){
              var that = this;
              setTimeout(function(){
                $(that).addClass('expand'); 
              },100*i);
            });
        }, 8000 );


 
        $('#logo-home').lazylinepainter({
            "svgData": global.misc.lazylinedata,
            "strokeWidth": 7, 
            "strokeColor": "#743335", 
            'scale':{
                'container' : $('#logo-home-holder'),
                'center':true
            },
            "onComplete":this.decorate
        }).lazylinepainter( ( global.smart.device ) ? 'stamp' : 'paint' ); 
 
      },


      onresize : function(){ },


      decorate : function(){   

        $('.logo-backing').addClass('expand');    
        
        var motifAr,
            decorations = this.getter('decorations'); 

 
        function returnMotif() {
            
            var newMotif = decorations.motifs[ Math.floor(Math.random()*decorations.motifs.length) ];
              
            return newMotif;
        } 

        

        $.each(decorations.containers, function( i , v ){
            
            var newMotif = returnMotif();  
             
            v.lazylinepainter({
                'svgData' : global.misc.lazylinedata, 
                'strokeWidth':2,
                'width':'100%',
                'delay':decorations.delay,
                'strokeColor':'#9a484a',
                'overrideKey' : returnMotif()
            }).lazylinepainter('paint');
        }); 
        
        function getRandomArbitary (min, max) {
            return Math.random() * (max - min) + min;
        }
        
        var mTop = 0, 
        heightUnit = global.screen.height / 10;  
        
        $('.dressing .lazy-line').each(function(){
        
            if( mTop === 0)
                mTop = getRandomArbitary ( heightUnit*2, heightUnit*8 );
            else if( mTop < heightUnit*5 )
                mTop = getRandomArbitary ( heightUnit*4, heightUnit*8 );
            else if( mTop >= heightUnit*5 )
                mTop = getRandomArbitary ( heightUnit*2 , heightUnit*5 );
            
            $(this).css({'margin-top' : mTop+'px' }); 
        });
      },


      setModel : function(){
        var decorations = {
              containers : {
                  right: $("#right-motif"),
                  left: $("#left-motif")
              },
              motifs : [
                  "dressing-up-jump",
                  "dressing-down-jump",
                  "dressing-down-scribble",
                  "dressing-up-zag",
                  "dressing-down-zag"
              ],
              delay : 2500 
            }
   
        this.setter( 'decorations' , decorations );
      }
    }); 

    
    return Home;
});