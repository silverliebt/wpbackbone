/*
* views / pages / home
* - - - - - - - - - - - - - -
*/
define([ 'jquery'
        ,'global'
        ,'underscore' 
        ,'plugins'
        ,'models/pages/home'
        ,'views/pages/base'
       ],function( $, global, _ , Plugins, HomeModel, BasePageView ) {       
     
    
    var Home = BasePageView.extend({

      model: new HomeModel(),

      initialize: function(){
        _.bindAll(this);

        global.handlers.resize.add({ 
          'id'      : 'home',
          'callback': this.onresize 
        });
      },


      render: function(){ 
    
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


      onresize : function(){
         
      },


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
      }
    }); 

    
    return Home;
});