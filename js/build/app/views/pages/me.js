/*
* views / pages / me
* - - - - - - - - - - - - - -
*/
define([ 'jquery'
        ,'utils/utils'
        ,'plugins'
        ,'global'
        ,'underscore'
        ,'views/pages/base'
        ,'models/svg'
        ,'models/pages/me'
        ,'views/pages/me/bio'
        ,'views/pages/me/skills'
        ,'views/pages/me/exp' 
       ],function( $, Utils, Plugins, global, _ , BasePageView, svg, MeModel, BioView, SkillsView, ExperienceView ) {       
    
     
    var About = BasePageView.extend({

      model: new MeModel(), 


      initialize: function(){
        _.bindAll(this);

        global.handlers.resize.add({ 
          'id'      : 'about',
          'callback': this.onresize 
        }); 
      },
    

      render: function(){ 

        this.menu();

        // init Biography View
        this.bioView = new BioView({ el : this.$el.find('.bio') });

        // init Skills View
        this.skillsView = new SkillsView({ el : this.$el.find('.skills') });   

        // init Experience View
        this.experienceView = new ExperienceView({ el : this.$el.find('.experience') });
        this.experienceView.render();             
      
        this.build();

        this.onscroll();
        this.onresize();
  
        return this;
      }, 


      menu : function(){

        var that = this;

        $('#bio-link').on('click', function(){
          that.$el.find('.scrollpane').scrollTo('.bio', {duration:1000} ); 
        })

        $('#skills-link').on('click', function(){
          that.$el.find('.scrollpane').scrollTo('.skills', {duration:2000} ); 
        })

        $('#exp-link').on('click', function(){
          that.$el.find('.scrollpane').scrollTo('.experience', {duration:3000} ); 
        })
      },


      build : function(){
        // Setup welcome area & sine wave background
        var $bgLines = $('ul.stripes.bg'),
            $helloLines = $('ul.stripes.menubg');


        // Sine wavves
        for (var n = 0; n < 100; n++)
            $bgLines.append('<li class="stripe"><div class="inner" /></li>');
          

        var frequency = .3,
            amplitude = 5,
            center = 5;

        $('#bg-stripes li.stripe').each(function(i,k){ 


            var v = Math.sin(frequency*i) * amplitude + center ,
                that = this; 
            v = Math.round(v * 100) / 100;  
            setTimeout(function(){
                $(that).css({'height': 90 + v + '%'});
                $(that).find('.inner').addClass('expand');
            },100*i);
        });   


        // Welcome area
        for (var n = 0; n < 23; n++)
            $helloLines.append('<li class="stripe"><div class="inner" /></li>');

        var c = 0, 
            topSpacer = 1;

        $('ul.stripes.menubg > li.stripe').each(function(i,k){

            var that = this;

            if( c == 5 ) 
              c = 0;
            else
              c++; 

            $(this).css({'margin-top': c+'%'});

            setTimeout(function(){
                $(that).addClass('expand');
                $(that).find('.inner').addClass('expand');
            },100*i);
        });
      },


      onscroll : function(){ 

        var $skills = this.skillsView.$el,
            $skillsOffset = $skills.offset(),
            that = this;
  
        global.handlers.scroll.add({ 
            'id'      : 'me',
            'callback': { 
                'start': 20, 
                'end': 3000,
                'callback' : function(scrollTop,scrollDirection){  

                  if( scrollTop > ( $skillsOffset.top - ( global.screen.height / 3 ) ) && !that.skillsView.rendered ){
                    that.skillsView.render();
                  }

                  if( that.bioView.expanded ){
                    var nzOffset = $('#nz').offset();
 
                    if( scrollTop > ( nzOffset.top - ( global.screen.height / 3 ) ))
                      that.bioView.buildNZ();
                  }
                }
            }
          }
        ); 
      },
 

      onresize : function(){
        $('.welcome').css('height', global.screen.height-95); 
      }

    });
    
    return About;
});