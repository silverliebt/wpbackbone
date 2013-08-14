define([
    "jquery",
    "raphael"], 
    function($, Raphael ) { 

    /*  @ build / design - behance.net/camoconnell - Feb 2013 */

/* 
* Lazy Line Painter 1.4
* SVG Stroke animation.
*
* https://github.com/camoconnell/lazy-line-painter
* http://www.camoconnell.com
*
* Copyright 2013 Cam O'Connell
* Licensed under the MIT license.
*  
*/ 

(function( $, window, undefined ){ 

    var dataKey = 'lazyLinePainter';

    var methods = {


        // setup lazy line data
        init : function( options ) { 

            return this.each(function(){

                var $this = $(this),
                    d = $this.data( dataKey );

                $this.addClass('lazy-line');

                // If the plugin hasn't been initialized yet
                if ( ! d ) { 

                    /*
                        SETUP DATA
                    */

                    // Collect settings, define defaults
                    var o = $.extend( {
                            'width'         : null,
                            'height'        : null,
                            'strokeWidth'   : 2,
                            'strokeColor'   : '#000',
                            'strokeOverColor': null,
                            'strokeCap'     : 'round',
                            'strokeJoin'    : 'round',
                            'strokeOpacity' : 1,
                            'arrowEnd'      : 'none', 
                            'strokeDash'    : null,
                            'onComplete'    : null, 
                            'delay'         : null,
                            'overrideKey'   : null,
                            'scale'         : null
                        },  options);  

                    // Set up path information
                    // if overrideKey has been defined - use overrideKey as key within the svgData object.
                    // else - use the elements id as key within the svgData object.
                    var target = ( o.overrideKey === null ) ? $this.attr('id').replace('#','') : o.overrideKey;


                    var $w = o.svgData[target].dimensions.width, 
                        $h = o.svgData[target].dimensions.height;

                    o.svgData  = o.svgData[target].strokepath;

                    // Setup dimensions
                    if( o.width  === null ) o.width  = $w;
                    if( o.height === null ) o.height = $h; 
 

                    // Setup Rapheal 
                    //var $s = $this.attr("id"); // Requires Id 

                    // Setup Rapheal 
                    var paper = ( o.scale === null ) ? new Raphael($this[0], $w, $h) : new ScaleRaphael( $this, $w, $h  );

                    if( o.scale !== null ){ 

                        //o.scale.center = !o.scale.center; 
                        var center = o.scale.center  || false;

                        console.log('center - '+center)

                        if( o.scale.center ){
                            o.scale.container.css({ 'top' : '50%', 'left' : '50%', 'position' : 'absolute' });
                        }

                        var resizePaper = function(){ 

                            paper.changeSize( o.scale.container.width(), o.scale.container.height() );
                           


                            if( o.scale.center ){
                                o.scale.container.css({ 
                                    'marginTop': ( -o.scale.container.height() / 2 ),
                                    'marginLeft':( -o.scale.container.width() / 2 ) 
                                });
                            }; 
                        }

                        $(window).resize(resizePaper);

                        setTimeout(function(){
                            $(window).trigger('resize');
                        }, 30);
                    }

                 
                    /*
                        BIND DATA TO ELEMENT
                    */

                    $this.data( dataKey , { 
                        'svgData'           : o.svgData,
                        'width'             : o.width,
                        'height'            : o.height,
                        'strokeWidth'       : o.strokeWidth,
                        'strokeColor'       : o.strokeColor,
                        'strokeOverColor'   : o.strokeOverColor,
                        'strokeCap'         : o.strokeCap,
                        'strokeJoin'        : o.strokeJoin,
                        'strokeOpacity'     : o.strokeOpacity,
                        'strokeDash'        : o.strokeDash,
                        'arrowEnd'          : o.arrowEnd, 
                        'onComplete'        : o.onComplete, 
                        'delay'             : o.delay,
                        'overrideKey'       : o.overrideKey,
                        'paper'             : paper,
                        'count'             : 1,
                        'complete'          : false,
                        'playhead'          : 0,
                        'setTimeOutHandler' : []
                    }); 
                }
            });

        },


        /*
            PAINT LAZY LINE DATA
        */
        paint : function( ) { 

            return this.each(function(){

                var $this = $(this),
                d = $this.data( dataKey );  

                var init = function(){

                    // Set width / height of container element
                    if( d.scale === null )
                        $this.css({'width' : d.width, 'height' : d.height});


                    // Loop paths 
                    $.each(d.svgData, function (i, val) {

                        var p = d.paper.path(val.path);

                        p.attr({ 
                            "stroke" : "none",
                            "stroke-width": d.strokeWidth,
                            "fill-opacity": 0
                        });

                        var sto = setTimeout(function () {

                            var s = draw({
                                'count' : d.count,
                                'canvas'   : d.paper, 
                                'pathstr'  : p, 
                                'duration' : val.duration, 
                                'attr'     : applyStyles( d, val ),
                                'callback' : function (e) {  

                                    // remove reference to setTimeOut
                                    d.setTimeOutHandler.splice(d.count,1);

                                    d.count++;

                                    if (d.svgData.length == d.count){
                                            d.complete = true;
                                            if(d.onComplete !== null) d.onComplete.call($this);
                                        }
                                    }
                                });

                        }, d.playhead);

                        d.playhead += val.duration;

                        // Keep track of setTimeOuts calls
                        d.setTimeOutHandler.push(sto); 

                    });
                };
 

                // if delay isset
                if(d.delay === null)
                    init();
                else
                    setTimeout(init, d.delay);
            });
        },


        /*
            ERASE LAZY LINE DATA
        */
        erase : function( ) { 

            return this.each(function(){

                var $this = $(this);
                $this.find('svg').empty();
                d = $this.data( dataKey ); 

                // reset properties
                for (i = 0; i < d.setTimeOutHandler.length; i++) {
                    clearTimeout( d.setTimeOutHandler[i] );
                }

                d.playhead = 0;
                d.count = 0;
                d.complete = false; 
            });
        },


        /*
            DESTROY LAZY LINE DATA & ELEMENT
        */
        destroy : function( ) { 

            return this.each(function(){

                var $this = $(this),
                d = $this.data( dataKey ); 
                $this.removeData( dataKey ); 
                $this.remove();
            });
        },


        /*
            STAMP LAZY LINE DATA 
        */
        stamp : function( ) { 

            return this.each(function(){

                var $this = $(this),
                d = $this.data( dataKey );  
                
                var init = function(){

                    // Set width / height of container element
                    $this.css({'width' : d.width, 'height' : d.height});

                    // Loop paths 
                    //$.each(d.svgData, function (i, val) {
                    for (i = 0; i < d.svgData.length; i++) {
                        d.paper.path( d.svgData[i].path ).attr( applyStyles( d, d.svgData[i] ) );
                    }
                     
                };
                
                // if delay isset
                if(d.delay === null)
                    init();
                else
                    setTimeout(init, d.delay);
            }); 
        },


        /*
            GET LAZY LINE DATA 
        */
        get : function( arg ) { 

            return this.each(function(){

                var $this = $(this),
                    d = $this.data( dataKey ),
                    property = d[arg];   

                return property;
            }); 
        },


        /*
            SET LAZY LINE DATA 
        */
        set : function( settings ) { 

            return this.each(function(){

                var $this = $(this),
                    d = $this.data( dataKey );

                d[settings.attr] = settings.value;   
            }); 
        },


        /*
            SET LAZY LINE DATA 
        */
        color : function( options ) { 

            return this.each(function(){

                var $this = $(this),
                    d = $this.data( dataKey ),
                    o = options;

                if( o.state === 'over'){    
                    $this.find('svg path').each( function(i, v){ 
                    
                        var scOver = d.svgData[i].strokeColorOver;
                        $(this).stop().animate({
                            'stroke': ( !scOver )   ? o.color : scOver 
                        }, o.duration );
                    });
                } else {
                    $this.find('svg path').each( function(i, v){ 
                    
                        var scOut = d.svgData[i].strokeColor;  
                        $(this).stop().animate({
                            'stroke': ( !scOut ) ? d.strokeColor : scOut 
                        }, o.duration );
                    }); 
                }
            }); 
        }     
    };

    


    var applyStyles = function( data, value ) {
 
        var styles = {
            "stroke"        : ( !value.strokeColor )        ? data.strokeColor : value.strokeColor, 
            "fill-opacity"    : 0,
            "stroke-dasharray": ( !value.strokeDash )   ? data.strokeDash : value.strokeDash,
            "stroke-opacity"  : ( !value.strokeOpacity )? data.strokeOpacity : value.strokeOpacity,
            "stroke-width"    : ( !value.strokeWidth )  ? data.strokeWidth : value.strokeWidth,
            "stroke-linecap"  : ( !value.strokeCap )    ? data.strokeCap : value.strokeCap,
            "stroke-linejoin" : ( !value.strokeJoin )   ? data.strokeJoin : value.strokeJoin,
            "arrow-end"         : ( !value.arrowEnd )       ? data.arrowEnd : value.arrowEnd

        };

        return styles;
    };
    
 

    var draw = function( settings ) {

        var canvas   = settings.canvas, 
            pathstr  = settings.pathstr, 
            duration = settings.duration, 
            attr     = settings.attr, 
            callback = settings.callback;

        var guide_path;
        
        if ( typeof( pathstr ) == "string" )
            guide_path = canvas.path( pathstr ).attr( { stroke: "none", fill: "none" } );
        else
            guide_path = pathstr;

        var path = canvas.path( guide_path.getSubpath( 0, 1 ) ).attr( attr ),
            total_length = guide_path.getTotalLength( guide_path ),
            last_point = guide_path.getPointAtLength( 0 ),
            start_time = new Date().getTime(),
            interval_length = 25;        

        var interval_id = setInterval( function()
        {
            var elapsed_time = new Date().getTime() - start_time,
                this_length = elapsed_time / duration * total_length,
                subpathstr = guide_path.getSubpath( 0, this_length );  

            attr.path = subpathstr;

            path.animate( attr, interval_length );
            if ( elapsed_time >= duration )
            {
                clearInterval( interval_id );
                if ( callback !== undefined ) callback();
                guide_path.remove();
            }                                       
        }, interval_length );   
    };


    var ScaleRaphael = function( _this, width, height ){
 
        var $this = _this,
            $nestedWrapper, id, paper, vmlDiv;

        if ( !$this.css('position') || $this.css('position') == null ) 
            $this.css("position", "relative");

        $this.css({ 
            "width"     : width+"px",
            "height"    : height+"px",
            "overflow"  : "hidden"
        }); 
          
        // set unique id, so we can find this resize instance and remove from resize stack
        var timestamp = new Date().getUTCMilliseconds();
        timestamp = String(timestamp); 

        if ( Raphael.type === "VML" ){
            id = "vmlgroup-"+timestamp;
            $this.append("<rvml:group style='position : absolute; width: 1000px; height: 1000px; top: 0px; left: 0px' coordsize='1000,1000' class='rvml' id='vmlgroup"+id+"'><\/rvml:group>");
        }else{
            id = "svggroup-"+timestamp;
            $this.append("<div id='"+id+"' />");
        }

        $nestedWrapper = $('#'+id);
     
        paper = new Raphael( id , width, height ); 
 

        if (Raphael.type === "SVG")
            paper.canvas.setAttribute("viewBox", "0 0 "+width+" "+height);
        else
            vmlDiv = $this.getElementsByTagName("div")[0];

        
        paper.changeSize = function( w, h, center, clipping ){
 
            clipping = !clipping; 

            var ratioW = w / width,
                ratioH = h / height,
                scale = ratioW < ratioH ? ratioW : ratioH,
                newHeight = parseInt( height * scale ,10 ),
                newWidth = parseInt( width * scale ,10 ),
                newSize;  

            if ( Raphael.type === "VML" ){
                // scale the textpaths
                var txt = $(".textpath");
                
                for (var i in txt){
                    var curr = txt[i];
                    
                    if (curr.style){
                        if(!curr._fontSize){
                            var mod = curr.style.font.split("px");
                            curr._fontSize = parseInt(mod[0],10);
                            curr._font = mod[1];
                        }
                        
                        curr.style.font = curr._fontSize * scale + "px" + curr._font;
                    }
                }
 
                if ( newWidth < newHeight )
                    newSize = newWidth * 1000 / width;
                else
                    newSize = newHeight * 1000 / height;
                
                newSize = parseInt(newSize, 10);
                $nestedWrapper.css( 'width' , newSize + "px");
                $nestedWrapper.css( 'height' , newSize + "px");
                
                if (clipping){
                    $nestedWrapper.css( "left" , parseInt((w - newWidth) / 2, 10) + "px");
                    $nestedWrapper.css( "top" , parseInt((h - newHeight) / 2, 10) + "px");
                }
                
                vmlDiv.style.overflow = "visible";
            }
          
            if (clipping){
                newWidth = w;
                newHeight = h;
            }

            $this.css({ 'width' : newWidth,
                        'height': newHeight});
  
            this.setSize( newWidth, newHeight );

            // if ( center ){
            //     $this.css({
            //         "position"  : "absolute",
            //         "left"      : parseInt((w - newWidth) / 2,10) + "px",
            //         "top"       : parseInt((h - newHeight) / 2,10) + "px"
            //     });
            // }
        };
        


        paper.scaleAll = function(amount){
            paper.changeSize(width * amount, height * amount);
        }; 

        paper.w = width;
        paper.h = height;
        
        return paper;
    };
    

    $.fn.lazylinepainter = function(method){ 

        if ( methods[method] ) { 

            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));

        } else if ( typeof method === 'object' || ! method ) {

            return methods.init.apply( this, arguments );

        } else {
             // error
        }  
    };

})( jQuery, window ); 


 /* http://keith-wood.name/countdown.html
   Countdown for jQuery v1.6.2.
   Written by Keith Wood (kbwood{at}iinet.com.au) January 2008.
   Available under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license. 
   Please attribute the author if you use it. */
(function($){function Countdown(){this.regional=[];this.regional['']={labels:['Years','Months','Weeks','Days','Hours','Minutes','Seconds'],labels1:['Year','Month','Week','Day','Hour','Minute','Second'],compactLabels:['y','m','w','d'],whichLabels:null,digits:['0','1','2','3','4','5','6','7','8','9'],timeSeparator:':',isRTL:false};this._defaults={until:null,since:null,timezone:null,serverSync:null,format:'dHMS',layout:'',compact:false,significant:0,description:'',expiryUrl:'',expiryText:'',alwaysExpire:false,onExpiry:null,onTick:null,tickInterval:1};$.extend(this._defaults,this.regional['']);this._serverSyncs=[];function timerCallBack(a){var b=(a<1e12?(b=performance.now?(performance.now()+performance.timing.navigationStart):Date.now()):a||new Date().getTime());if(b-d>=1000){x._updateTargets();d=b}c(timerCallBack)}var c=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||null;var d=0;if(!c||$.noRequestAnimationFrame){$.noRequestAnimationFrame=null;setInterval(function(){x._updateTargets()},980)}else{d=window.animationStartTime||window.webkitAnimationStartTime||window.mozAnimationStartTime||window.oAnimationStartTime||window.msAnimationStartTime||new Date().getTime();c(timerCallBack)}}var Y=0;var O=1;var W=2;var D=3;var H=4;var M=5;var S=6;$.extend(Countdown.prototype,{markerClassName:'hasCountdown',propertyName:'countdown',_rtlClass:'countdown_rtl',_sectionClass:'countdown_section',_amountClass:'countdown_amount',_rowClass:'countdown_row',_holdingClass:'countdown_holding',_showClass:'countdown_show',_descrClass:'countdown_descr',_timerTargets:[],setDefaults:function(a){this._resetExtraLabels(this._defaults,a);$.extend(this._defaults,a||{})},UTCDate:function(a,b,c,e,f,g,h,i){if(typeof b=='object'&&b.constructor==Date){i=b.getMilliseconds();h=b.getSeconds();g=b.getMinutes();f=b.getHours();e=b.getDate();c=b.getMonth();b=b.getFullYear()}var d=new Date();d.setUTCFullYear(b);d.setUTCDate(1);d.setUTCMonth(c||0);d.setUTCDate(e||1);d.setUTCHours(f||0);d.setUTCMinutes((g||0)-(Math.abs(a)<30?a*60:a));d.setUTCSeconds(h||0);d.setUTCMilliseconds(i||0);return d},periodsToSeconds:function(a){return a[0]*31557600+a[1]*2629800+a[2]*604800+a[3]*86400+a[4]*3600+a[5]*60+a[6]},_attachPlugin:function(a,b){a=$(a);if(a.hasClass(this.markerClassName)){return}var c={options:$.extend({},this._defaults),_periods:[0,0,0,0,0,0,0]};a.addClass(this.markerClassName).data(this.propertyName,c);this._optionPlugin(a,b)},_addTarget:function(a){if(!this._hasTarget(a)){this._timerTargets.push(a)}},_hasTarget:function(a){return($.inArray(a,this._timerTargets)>-1)},_removeTarget:function(b){this._timerTargets=$.map(this._timerTargets,function(a){return(a==b?null:a)})},_updateTargets:function(){for(var i=this._timerTargets.length-1;i>=0;i--){this._updateCountdown(this._timerTargets[i])}},_optionPlugin:function(a,b,c){a=$(a);var d=a.data(this.propertyName);if(!b||(typeof b=='string'&&c==null)){var e=b;b=(d||{}).options;return(b&&e?b[e]:b)}if(!a.hasClass(this.markerClassName)){return}b=b||{};if(typeof b=='string'){var e=b;b={};b[e]=c}this._resetExtraLabels(d.options,b);var f=(d.options.timezone!=b.timezone);$.extend(d.options,b);this._adjustSettings(a,d,b.until!=null||b.since!=null||f);var g=new Date();if((d._since&&d._since<g)||(d._until&&d._until>g)){this._addTarget(a[0])}this._updateCountdown(a,d)},_updateCountdown:function(a,b){var c=$(a);b=b||c.data(this.propertyName);if(!b){return}c.html(this._generateHTML(b)).toggleClass(this._rtlClass,b.options.isRTL);if($.isFunction(b.options.onTick)){var d=b._hold!='lap'?b._periods:this._calculatePeriods(b,b._show,b.options.significant,new Date());if(b.options.tickInterval==1||this.periodsToSeconds(d)%b.options.tickInterval==0){b.options.onTick.apply(a,[d])}}var e=b._hold!='pause'&&(b._since?b._now.getTime()<b._since.getTime():b._now.getTime()>=b._until.getTime());if(e&&!b._expiring){b._expiring=true;if(this._hasTarget(a)||b.options.alwaysExpire){this._removeTarget(a);if($.isFunction(b.options.onExpiry)){b.options.onExpiry.apply(a,[])}if(b.options.expiryText){var f=b.options.layout;b.options.layout=b.options.expiryText;this._updateCountdown(a,b);b.options.layout=f}if(b.options.expiryUrl){window.location=b.options.expiryUrl}}b._expiring=false}else if(b._hold=='pause'){this._removeTarget(a)}c.data(this.propertyName,b)},_resetExtraLabels:function(a,b){var c=false;for(var n in b){if(n!='whichLabels'&&n.match(/[Ll]abels/)){c=true;break}}if(c){for(var n in a){if(n.match(/[Ll]abels[02-9]|compactLabels1/)){a[n]=null}}}},_adjustSettings:function(a,b,c){var d;var e=0;var f=null;for(var i=0;i<this._serverSyncs.length;i++){if(this._serverSyncs[i][0]==b.options.serverSync){f=this._serverSyncs[i][1];break}}if(f!=null){e=(b.options.serverSync?f:0);d=new Date()}else{var g=($.isFunction(b.options.serverSync)?b.options.serverSync.apply(a,[]):null);d=new Date();e=(g?d.getTime()-g.getTime():0);this._serverSyncs.push([b.options.serverSync,e])}var h=b.options.timezone;h=(h==null?-d.getTimezoneOffset():h);if(c||(!c&&b._until==null&&b._since==null)){b._since=b.options.since;if(b._since!=null){b._since=this.UTCDate(h,this._determineTime(b._since,null));if(b._since&&e){b._since.setMilliseconds(b._since.getMilliseconds()+e)}}b._until=this.UTCDate(h,this._determineTime(b.options.until,d));if(e){b._until.setMilliseconds(b._until.getMilliseconds()+e)}}b._show=this._determineShow(b)},_destroyPlugin:function(a){a=$(a);if(!a.hasClass(this.markerClassName)){return}this._removeTarget(a[0]);a.removeClass(this.markerClassName).empty().removeData(this.propertyName)},_pausePlugin:function(a){this._hold(a,'pause')},_lapPlugin:function(a){this._hold(a,'lap')},_resumePlugin:function(a){this._hold(a,null)},_hold:function(a,b){var c=$.data(a,this.propertyName);if(c){if(c._hold=='pause'&&!b){c._periods=c._savePeriods;var d=(c._since?'-':'+');c[c._since?'_since':'_until']=this._determineTime(d+c._periods[0]+'y'+d+c._periods[1]+'o'+d+c._periods[2]+'w'+d+c._periods[3]+'d'+d+c._periods[4]+'h'+d+c._periods[5]+'m'+d+c._periods[6]+'s');this._addTarget(a)}c._hold=b;c._savePeriods=(b=='pause'?c._periods:null);$.data(a,this.propertyName,c);this._updateCountdown(a,c)}},_getTimesPlugin:function(a){var b=$.data(a,this.propertyName);return(!b?null:(b._hold=='pause'?b._savePeriods:(!b._hold?b._periods:this._calculatePeriods(b,b._show,b.options.significant,new Date()))))},_determineTime:function(k,l){var m=function(a){var b=new Date();b.setTime(b.getTime()+a*1000);return b};var n=function(a){a=a.toLowerCase();var b=new Date();var c=b.getFullYear();var d=b.getMonth();var e=b.getDate();var f=b.getHours();var g=b.getMinutes();var h=b.getSeconds();var i=/([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g;var j=i.exec(a);while(j){switch(j[2]||'s'){case's':h+=parseInt(j[1],10);break;case'm':g+=parseInt(j[1],10);break;case'h':f+=parseInt(j[1],10);break;case'd':e+=parseInt(j[1],10);break;case'w':e+=parseInt(j[1],10)*7;break;case'o':d+=parseInt(j[1],10);e=Math.min(e,x._getDaysInMonth(c,d));break;case'y':c+=parseInt(j[1],10);e=Math.min(e,x._getDaysInMonth(c,d));break}j=i.exec(a)}return new Date(c,d,e,f,g,h,0)};var o=(k==null?l:(typeof k=='string'?n(k):(typeof k=='number'?m(k):k)));if(o)o.setMilliseconds(0);return o},_getDaysInMonth:function(a,b){return 32-new Date(a,b,32).getDate()},_normalLabels:function(a){return a},_generateHTML:function(c){var d=this;c._periods=(c._hold?c._periods:this._calculatePeriods(c,c._show,c.options.significant,new Date()));var e=false;var f=0;var g=c.options.significant;var h=$.extend({},c._show);for(var i=Y;i<=S;i++){e|=(c._show[i]=='?'&&c._periods[i]>0);h[i]=(c._show[i]=='?'&&!e?null:c._show[i]);f+=(h[i]?1:0);g-=(c._periods[i]>0?1:0)}var j=[false,false,false,false,false,false,false];for(var i=S;i>=Y;i--){if(c._show[i]){if(c._periods[i]){j[i]=true}else{j[i]=g>0;g--}}}var k=(c.options.compact?c.options.compactLabels:c.options.labels);var l=c.options.whichLabels||this._normalLabels;var m=function(a){var b=c.options['compactLabels'+l(c._periods[a])];return(h[a]?d._translateDigits(c,c._periods[a])+(b?b[a]:k[a])+' ':'')};var n=function(a){var b=c.options['labels'+l(c._periods[a])];return((!c.options.significant&&h[a])||(c.options.significant&&j[a])?'<span class="'+x._sectionClass+'">'+'<span class="'+x._amountClass+'">'+d._translateDigits(c,c._periods[a])+'</span><br/>'+(b?b[a]:k[a])+'</span>':'')};return(c.options.layout?this._buildLayout(c,h,c.options.layout,c.options.compact,c.options.significant,j):((c.options.compact?'<span class="'+this._rowClass+' '+this._amountClass+(c._hold?' '+this._holdingClass:'')+'">'+m(Y)+m(O)+m(W)+m(D)+(h[H]?this._minDigits(c,c._periods[H],2):'')+(h[M]?(h[H]?c.options.timeSeparator:'')+this._minDigits(c,c._periods[M],2):'')+(h[S]?(h[H]||h[M]?c.options.timeSeparator:'')+this._minDigits(c,c._periods[S],2):''):'<span class="'+this._rowClass+' '+this._showClass+(c.options.significant||f)+(c._hold?' '+this._holdingClass:'')+'">'+n(Y)+n(O)+n(W)+n(D)+n(H)+n(M)+n(S))+'</span>'+(c.options.description?'<span class="'+this._rowClass+' '+this._descrClass+'">'+c.options.description+'</span>':'')))},_buildLayout:function(c,d,e,f,g,h){var j=c.options[f?'compactLabels':'labels'];var k=c.options.whichLabels||this._normalLabels;var l=function(a){return(c.options[(f?'compactLabels':'labels')+k(c._periods[a])]||j)[a]};var m=function(a,b){return c.options.digits[Math.floor(a/b)%10]};var o={desc:c.options.description,sep:c.options.timeSeparator,yl:l(Y),yn:this._minDigits(c,c._periods[Y],1),ynn:this._minDigits(c,c._periods[Y],2),ynnn:this._minDigits(c,c._periods[Y],3),y1:m(c._periods[Y],1),y10:m(c._periods[Y],10),y100:m(c._periods[Y],100),y1000:m(c._periods[Y],1000),ol:l(O),on:this._minDigits(c,c._periods[O],1),onn:this._minDigits(c,c._periods[O],2),onnn:this._minDigits(c,c._periods[O],3),o1:m(c._periods[O],1),o10:m(c._periods[O],10),o100:m(c._periods[O],100),o1000:m(c._periods[O],1000),wl:l(W),wn:this._minDigits(c,c._periods[W],1),wnn:this._minDigits(c,c._periods[W],2),wnnn:this._minDigits(c,c._periods[W],3),w1:m(c._periods[W],1),w10:m(c._periods[W],10),w100:m(c._periods[W],100),w1000:m(c._periods[W],1000),dl:l(D),dn:this._minDigits(c,c._periods[D],1),dnn:this._minDigits(c,c._periods[D],2),dnnn:this._minDigits(c,c._periods[D],3),d1:m(c._periods[D],1),d10:m(c._periods[D],10),d100:m(c._periods[D],100),d1000:m(c._periods[D],1000),hl:l(H),hn:this._minDigits(c,c._periods[H],1),hnn:this._minDigits(c,c._periods[H],2),hnnn:this._minDigits(c,c._periods[H],3),h1:m(c._periods[H],1),h10:m(c._periods[H],10),h100:m(c._periods[H],100),h1000:m(c._periods[H],1000),ml:l(M),mn:this._minDigits(c,c._periods[M],1),mnn:this._minDigits(c,c._periods[M],2),mnnn:this._minDigits(c,c._periods[M],3),m1:m(c._periods[M],1),m10:m(c._periods[M],10),m100:m(c._periods[M],100),m1000:m(c._periods[M],1000),sl:l(S),sn:this._minDigits(c,c._periods[S],1),snn:this._minDigits(c,c._periods[S],2),snnn:this._minDigits(c,c._periods[S],3),s1:m(c._periods[S],1),s10:m(c._periods[S],10),s100:m(c._periods[S],100),s1000:m(c._periods[S],1000)};var p=e;for(var i=Y;i<=S;i++){var q='yowdhms'.charAt(i);var r=new RegExp('\\{'+q+'<\\}(.*)\\{'+q+'>\\}','g');p=p.replace(r,((!g&&d[i])||(g&&h[i])?'$1':''))}$.each(o,function(n,v){var a=new RegExp('\\{'+n+'\\}','g');p=p.replace(a,v)});return p},_minDigits:function(a,b,c){b=''+b;if(b.length>=c){return this._translateDigits(a,b)}b='0000000000'+b;return this._translateDigits(a,b.substr(b.length-c))},_translateDigits:function(b,c){return(''+c).replace(/[0-9]/g,function(a){return b.options.digits[a]})},_determineShow:function(a){var b=a.options.format;var c=[];c[Y]=(b.match('y')?'?':(b.match('Y')?'!':null));c[O]=(b.match('o')?'?':(b.match('O')?'!':null));c[W]=(b.match('w')?'?':(b.match('W')?'!':null));c[D]=(b.match('d')?'?':(b.match('D')?'!':null));c[H]=(b.match('h')?'?':(b.match('H')?'!':null));c[M]=(b.match('m')?'?':(b.match('M')?'!':null));c[S]=(b.match('s')?'?':(b.match('S')?'!':null));return c},_calculatePeriods:function(c,d,e,f){c._now=f;c._now.setMilliseconds(0);var g=new Date(c._now.getTime());if(c._since){if(f.getTime()<c._since.getTime()){c._now=f=g}else{f=c._since}}else{g.setTime(c._until.getTime());if(f.getTime()>c._until.getTime()){c._now=f=g}}var h=[0,0,0,0,0,0,0];if(d[Y]||d[O]){var i=x._getDaysInMonth(f.getFullYear(),f.getMonth());var j=x._getDaysInMonth(g.getFullYear(),g.getMonth());var k=(g.getDate()==f.getDate()||(g.getDate()>=Math.min(i,j)&&f.getDate()>=Math.min(i,j)));var l=function(a){return(a.getHours()*60+a.getMinutes())*60+a.getSeconds()};var m=Math.max(0,(g.getFullYear()-f.getFullYear())*12+g.getMonth()-f.getMonth()+((g.getDate()<f.getDate()&&!k)||(k&&l(g)<l(f))?-1:0));h[Y]=(d[Y]?Math.floor(m/12):0);h[O]=(d[O]?m-h[Y]*12:0);f=new Date(f.getTime());var n=(f.getDate()==i);var o=x._getDaysInMonth(f.getFullYear()+h[Y],f.getMonth()+h[O]);if(f.getDate()>o){f.setDate(o)}f.setFullYear(f.getFullYear()+h[Y]);f.setMonth(f.getMonth()+h[O]);if(n){f.setDate(o)}}var p=Math.floor((g.getTime()-f.getTime())/1000);var q=function(a,b){h[a]=(d[a]?Math.floor(p/b):0);p-=h[a]*b};q(W,604800);q(D,86400);q(H,3600);q(M,60);q(S,1);if(p>0&&!c._since){var r=[1,12,4.3482,7,24,60,60];var s=S;var t=1;for(var u=S;u>=Y;u--){if(d[u]){if(h[s]>=t){h[s]=0;p=1}if(p>0){h[u]++;p=0;s=u;t=1}}t*=r[u]}}if(e){for(var u=Y;u<=S;u++){if(e&&h[u]){e--}else if(!e){h[u]=0}}}return h}});var w=['getTimes'];function isNotChained(a,b){if(a=='option'&&(b.length==0||(b.length==1&&typeof b[0]=='string'))){return true}return $.inArray(a,w)>-1}$.fn.countdown=function(a){var b=Array.prototype.slice.call(arguments,1);if(isNotChained(a,b)){return x['_'+a+'Plugin'].apply(x,[this[0]].concat(b))}return this.each(function(){if(typeof a=='string'){if(!x['_'+a+'Plugin']){throw'Unknown command: '+a;}x['_'+a+'Plugin'].apply(x,[this].concat(b))}else{x._attachPlugin(this,a||{})}})};var x=$.countdown=new Countdown()})(jQuery);
    
    
    
    /* Modernizr 2.6.2 (Custom Build) | MIT & BSD
     * Build: http://modernizr.com/download/#-cssanimations-csstransitions-touch-shiv-cssclasses-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes-load
     */
    ;window.Modernizr=function(a,b,c){function z(a){j.cssText=a}function A(a,b){return z(m.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a){var e=a[d];if(!C(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:w(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},q.cssanimations=function(){return F("animationName")},q.csstransitions=function(){return F("transition")};for(var G in q)y(q,G)&&(v=G.toLowerCase(),e[v]=q[G](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)y(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},z(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=w,e.prefixed=function(a,b,c){return b?F(a,b,c):F(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
    
    
    
    
    /*!
     * Socialite v2.0
     * http://socialitejs.com
     * Copyright (c) 2011 David Bushell
     * Dual-licensed under the BSD or MIT licenses: http://socialitejs.com/license.txt
     */
    window.Socialite=function(a,b,c){"use strict";var d=0,e=[],f={},g={},h=/^($|loaded|complete)/,i=a.encodeURIComponent,j={settings:{},trim:function(a){return a.trim?a.trim():a.replace(/^\s+|\s+$/g,"")},hasClass:function(a,b){return(" "+a.className+" ").indexOf(" "+b+" ")!==-1},addClass:function(a,b){j.hasClass(a,b)||(a.className=a.className===""?b:a.className+" "+b)},removeClass:function(a,b){a.className=j.trim(" "+a.className+" ".replace(" "+b+" "," "))},extendObject:function(a,b,d){for(var e in b){var f=a[e]!==c;if(f&&typeof b[e]=="object")j.extendObject(a[e],b[e],d);else if(d||!f)a[e]=b[e]}},getElements:function(a,b){var c=0,d=[],e=!!a.getElementsByClassName,f=e?a.getElementsByClassName(b):a.getElementsByTagName("*");for(;c<f.length;c++)(e||j.hasClass(f[c],b))&&d.push(f[c]);return d},getDataAttributes:function(a,b,c){var d=0,e="",f={},g=a.attributes;for(;d<g.length;d++){var h=g[d].name,j=g[d].value;j.length&&h.indexOf("data-")===0&&(b&&(h=h.substring(5)),c?f[h]=j:e+=i(h)+"="+i(j)+"&")}return c?f:e},copyDataAttributes:function(a,b,c,d){var e=j.getDataAttributes(a,c,!0);for(var f in e)b.setAttribute(d?f.replace(/-/g,"_"):f,e[f])},createIframe:function(a,c){var d=b.createElement("iframe");return d.style.cssText="overflow: hidden; border: none;",j.extendObject(d,{src:a,allowtransparency:"true",frameborder:"0",scrolling:"no"},!0),c&&(d.onload=d.onreadystatechange=function(){h.test(d.readyState||"")&&(d.onload=d.onreadystatechange=null,j.activateInstance(c))}),d},networkReady:function(a){return f[a]?f[a].loaded:c},appendNetwork:function(a){if(!a||a.appended)return;if(typeof a.append=="function"&&a.append(a)===!1){a.appended=a.loaded=!0,j.activateAll(a);return}a.script&&(a.el=b.createElement("script"),j.extendObject(a.el,a.script,!0),a.el.async=!0,a.el.onload=a.el.onreadystatechange=function(){if(h.test(a.el.readyState||"")){a.el.onload=a.el.onreadystatechange=null,a.loaded=!0;if(typeof a.onload=="function"&&a.onload(a)===!1)return;j.activateAll(a)}},b.body.appendChild(a.el)),a.appended=!0},removeNetwork:function(a){return j.networkReady(a.name)?(a.el.parentNode.removeChild(a.el),!(a.appended=a.loaded=!1)):!1},reloadNetwork:function(a){var b=f[a];b&&j.removeNetwork(b)&&j.appendNetwork(b)},createInstance:function(a,b){var f=!0,g={el:a,uid:d++,widget:b};return e.push(g),b.process!==c&&(f=typeof b.process=="function"?b.process(g):!1),f&&j.processInstance(g),g.el.setAttribute("data-socialite",g.uid),g.el.className="socialite "+b.name+" socialite-instance",g},processInstance:function(a){var c=a.el;a.el=b.createElement("div"),a.el.className=c.className,j.copyDataAttributes(c,a.el),c.nodeName.toLowerCase()==="a"&&!c.getAttribute("data-default-href")&&a.el.setAttribute("data-default-href",c.getAttribute("href"));var d=c.parentNode;d.insertBefore(a.el,c),d.removeChild(c)},activateInstance:function(a){if(a&&!a.loaded)return a.loaded=!0,typeof a.widget.activate=="function"&&a.widget.activate(a),j.addClass(a.el,"socialite-loaded"),a.onload?a.onload(a.el):null},activateAll:function(a){typeof a=="string"&&(a=f[a]);for(var b=0;b<e.length;b++){var c=e[b];c.init&&c.widget.network===a&&j.activateInstance(c)}},load:function(a,c,d,f,h){a=a&&typeof a=="object"&&a.nodeType===1?a:b;if(!c||typeof c!="object"){j.load(a,j.getElements(a,"socialite"),d,f,h);return}var i;if(/Array/.test(Object.prototype.toString.call(c))){for(i=0;i<c.length;i++)j.load(a,c[i],d,f,h);return}if(c.nodeType!==1)return;if(!d||!g[d]){d=null;var k=c.className.split(" ");for(i=0;i<k.length;i++)if(g[k[i]]){d=k[i];break}if(!d)return}var l,m=g[d],n=parseInt(c.getAttribute("data-socialite"),10);if(!isNaN(n)){for(i=0;i<e.length;i++)if(e[i].uid===n){l=e[i];break}}else l=j.createInstance(c,m);if(h||!l)return;l.init||(l.init=!0,l.onload=typeof f=="function"?f:null,m.init(l)),m.network.appended?j.networkReady(m.network.name)&&j.activateInstance(l):j.appendNetwork(m.network)},activate:function(b,c,d){a.Socialite.load(null,b,c,d)},process:function(b,c,d){a.Socialite.load(b,c,d,null,!0)},network:function(a,b){f[a]={name:a,el:null,appended:!1,loaded:!1,widgets:{}},b&&j.extendObject(f[a],b)},widget:function(a,b,c){c.name=a+"-"+b;if(!f[a]||g[c.name])return;c.network=f[a],f[a].widgets[b]=g[c.name]=c},setup:function(a){j.extendObject(j.settings,a,!0)}};return j}(window,window.document),function(a,b,c,d){c.setup({facebook:{lang:"en_GB",appId:null},twitter:{lang:"en"},googleplus:{lang:"en-GB"}}),c.network("facebook",{script:{src:"//connect.facebook.net/{{language}}/all.js",id:"facebook-jssdk"},append:function(d){var e=b.createElement("div"),f=c.settings.facebook,g={onlike:"edge.create",onunlike:"edge.remove",onsend:"message.send"};e.id="fb-root",b.body.appendChild(e),d.script.src=d.script.src.replace("{{language}}",f.lang),a.fbAsyncInit=function(){a.FB.init({appId:f.appId,xfbml:!0});for(var b in g)typeof f[b]=="function"&&a.FB.Event.subscribe(g[b],f[b])}}}),c.widget("facebook","like",{init:function(d){var e=b.createElement("div");e.className="fb-like",c.copyDataAttributes(d.el,e),d.el.appendChild(e),a.FB&&a.FB.XFBML&&a.FB.XFBML.parse(d.el)}}),c.network("twitter",{script:{src:"//platform.twitter.com/widgets.js",id:"twitter-wjs",charset:"utf-8"},append:function(){var b=typeof a.twttr!="object",d=c.settings.twitter,e=["click","tweet","retweet","favorite","follow"];return b&&(a.twttr=t={_e:[],ready:function(a){t._e.push(a)}}),a.twttr.ready(function(a){for(var b=0;b<e.length;b++){var f=e[b];typeof d["on"+f]=="function"&&a.events.bind(f,d["on"+f])}c.activateAll("twitter")}),b}});var e=function(a){var d=b.createElement("a");d.className=a.widget.name+"-button",c.copyDataAttributes(a.el,d),d.setAttribute("href",a.el.getAttribute("data-default-href")),d.setAttribute("data-lang",a.el.getAttribute("data-lang")||c.settings.twitter.lang),a.el.appendChild(d)},f=function(b){a.twttr&&typeof a.twttr.widgets=="object"&&typeof a.twttr.widgets.load=="function"&&a.twttr.widgets.load()};c.widget("twitter","share",{init:e,activate:f}),c.widget("twitter","follow",{init:e,activate:f}),c.widget("twitter","hashtag",{init:e,activate:f}),c.widget("twitter","mention",{init:e,activate:f}),c.widget("twitter","embed",{process:function(a){a.innerEl=a.el,a.innerEl.getAttribute("data-lang")||a.innerEl.setAttribute("data-lang",c.settings.twitter.lang),a.el=b.createElement("div"),a.el.className=a.innerEl.className,a.innerEl.className="",a.innerEl.parentNode.insertBefore(a.el,a.innerEl),a.el.appendChild(a.innerEl)},init:function(a){a.innerEl.className="twitter-tweet"},activate:f}),c.network("googleplus",{script:{src:"//apis.google.com/js/plusone.js"},append:function(b){if(a.gapi)return!1;a.___gcfg={lang:c.settings.googleplus.lang,parsetags:"explicit"}}});var g=function(a){var d=b.createElement("div");d.className="g-"+a.widget.gtype,c.copyDataAttributes(a.el,d),a.el.appendChild(d),a.gplusEl=d},h=function(a,b){return typeof b!="function"?null:function(c){b(a.el,c)}},i=function(b){var d=b.widget.gtype;if(a.gapi&&a.gapi[d]){var e=c.settings.googleplus,f=c.getDataAttributes(b.el,!0,!0),g=["onstartinteraction","onendinteraction","callback"];for(var i=0;i<g.length;i++)f[g[i]]=h(b,e[g[i]]);a.gapi[d].render(b.gplusEl,f)}};c.widget("googleplus","one",{init:g,activate:i,gtype:"plusone"}),c.widget("googleplus","share",{init:g,activate:i,gtype:"plus"}),c.widget("googleplus","badge",{init:g,activate:i,gtype:"plus"}),c.network("linkedin",{script:{src:"//platform.linkedin.com/in.js"}});var j=function(d){var e=b.createElement("script");e.type="IN/"+d.widget.intype,c.copyDataAttributes(d.el,e),d.el.appendChild(e),typeof a.IN=="object"&&typeof a.IN.parse=="function"&&(a.IN.parse(d.el),c.activateInstance(d))};c.widget("linkedin","share",{init:j,intype:"Share"}),c.widget("linkedin","recommend",{init:j,intype:"RecommendProduct"})}(window,window.document,window.Socialite),function(){var a=window._socialite;if(/Array/.test(Object.prototype.toString.call(a)))for(var b=0,c=a.length;b<c;b++)typeof a[b]=="function"&&a[b]()}();
    
    
    
    
    
    
    
    /*global jQuery */
    /*! 
    * FitVids 1.0
    *
    * Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
    * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
    * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
    *
    * Date: Thu Sept 01 18:00:00 2011 -0500
    */
    (function(a){a.fn.fitVids=function(b){var c={customSelector:null};var d=document.createElement("div"),e=document.getElementsByTagName("base")[0]||document.getElementsByTagName("script")[0];d.className="fit-vids-style";d.innerHTML="­<style> .fluid-width-video-wrapper {width: 100%; position: relative; padding:0;}  .fluid-width-video-wrapper iframe, .fluid-width-video-wrapper object, .fluid-width-video-wrapper embed { position: absolute;top: 0; left: 0; width: 100%; height: 100%; } </style>";e.parentNode.insertBefore(d,e);if(b){a.extend(c,b)}return this.each(function(){var b=["iframe[src*='player.vimeo.com']","iframe[src*='www.youtube.com']","iframe[src*='www.kickstarter.com']","object","embed"];if(c.customSelector){b.push(c.customSelector)}var d=a(this).find(b.join(","));d.each(function(){var b=a(this);if(this.tagName.toLowerCase()=="embed"&&b.parent("object").length||b.parent(".fluid-width-video-wrapper").length){return}var c=this.tagName.toLowerCase()=="object"?b.attr("height"):b.height(),d=c/b.width();if(!b.attr("id")){var e="fitvid"+Math.floor(Math.random()*999999);b.attr("id",e)}b.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",d*100+"%");b.removeAttr("height").removeAttr("width")})})}})(jQuery);
    
    
    
    
    
    
    
    /**
     * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
     * Dual licensed under MIT and GPL.
     * @author Ariel Flesler
     * @version 1.4.3.1
     */
    (function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);
    
 
    
    /*! jQuery Color v@2.1.2 http://github.com/jquery/jquery-color | jquery.org/license */
    (function(a,b){function m(a,b,c){var d=h[b.type]||{};return a==null?c||!b.def?null:b.def:(a=d.floor?~~a:parseFloat(a),isNaN(a)?b.def:d.mod?(a+d.mod)%d.mod:0>a?0:d.max<a?d.max:a)}function n(b){var c=f(),d=c._rgba=[];return b=b.toLowerCase(),l(e,function(a,e){var f,h=e.re.exec(b),i=h&&e.parse(h),j=e.space||"rgba";if(i)return f=c[j](i),c[g[j].cache]=f[g[j].cache],d=c._rgba=f._rgba,!1}),d.length?(d.join()==="0,0,0,0"&&a.extend(d,k.transparent),c):k[b]}function o(a,b,c){return c=(c+1)%1,c*6<1?a+(b-a)*c*6:c*2<1?b:c*3<2?a+(b-a)*(2/3-c)*6:a}var c="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",d=/^([\-+])=\s*(\d+\.?\d*)/,e=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(a){return[a[1],a[2],a[3],a[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(a){return[a[1]*2.55,a[2]*2.55,a[3]*2.55,a[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(a){return[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(a){return[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(a){return[a[1],a[2]/100,a[3]/100,a[4]]}}],f=a.Color=function(b,c,d,e){return new a.Color.fn.parse(b,c,d,e)},g={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},h={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},i=f.support={},j=a("<p>")[0],k,l=a.each;j.style.cssText="background-color:rgba(1,1,1,.5)",i.rgba=j.style.backgroundColor.indexOf("rgba")>-1,l(g,function(a,b){b.cache="_"+a,b.props.alpha={idx:3,type:"percent",def:1}}),f.fn=a.extend(f.prototype,{parse:function(c,d,e,h){if(c===b)return this._rgba=[null,null,null,null],this;if(c.jquery||c.nodeType)c=a(c).css(d),d=b;var i=this,j=a.type(c),o=this._rgba=[];d!==b&&(c=[c,d,e,h],j="array");if(j==="string")return this.parse(n(c)||k._default);if(j==="array")return l(g.rgba.props,function(a,b){o[b.idx]=m(c[b.idx],b)}),this;if(j==="object")return c instanceof f?l(g,function(a,b){c[b.cache]&&(i[b.cache]=c[b.cache].slice())}):l(g,function(b,d){var e=d.cache;l(d.props,function(a,b){if(!i[e]&&d.to){if(a==="alpha"||c[a]==null)return;i[e]=d.to(i._rgba)}i[e][b.idx]=m(c[a],b,!0)}),i[e]&&a.inArray(null,i[e].slice(0,3))<0&&(i[e][3]=1,d.from&&(i._rgba=d.from(i[e])))}),this},is:function(a){var b=f(a),c=!0,d=this;return l(g,function(a,e){var f,g=b[e.cache];return g&&(f=d[e.cache]||e.to&&e.to(d._rgba)||[],l(e.props,function(a,b){if(g[b.idx]!=null)return c=g[b.idx]===f[b.idx],c})),c}),c},_space:function(){var a=[],b=this;return l(g,function(c,d){b[d.cache]&&a.push(c)}),a.pop()},transition:function(a,b){var c=f(a),d=c._space(),e=g[d],i=this.alpha()===0?f("transparent"):this,j=i[e.cache]||e.to(i._rgba),k=j.slice();return c=c[e.cache],l(e.props,function(a,d){var e=d.idx,f=j[e],g=c[e],i=h[d.type]||{};if(g===null)return;f===null?k[e]=g:(i.mod&&(g-f>i.mod/2?f+=i.mod:f-g>i.mod/2&&(f-=i.mod)),k[e]=m((g-f)*b+f,d))}),this[d](k)},blend:function(b){if(this._rgba[3]===1)return this;var c=this._rgba.slice(),d=c.pop(),e=f(b)._rgba;return f(a.map(c,function(a,b){return(1-d)*e[b]+d*a}))},toRgbaString:function(){var b="rgba(",c=a.map(this._rgba,function(a,b){return a==null?b>2?1:0:a});return c[3]===1&&(c.pop(),b="rgb("),b+c.join()+")"},toHslaString:function(){var b="hsla(",c=a.map(this.hsla(),function(a,b){return a==null&&(a=b>2?1:0),b&&b<3&&(a=Math.round(a*100)+"%"),a});return c[3]===1&&(c.pop(),b="hsl("),b+c.join()+")"},toHexString:function(b){var c=this._rgba.slice(),d=c.pop();return b&&c.push(~~(d*255)),"#"+a.map(c,function(a){return a=(a||0).toString(16),a.length===1?"0"+a:a}).join("")},toString:function(){return this._rgba[3]===0?"transparent":this.toRgbaString()}}),f.fn.parse.prototype=f.fn,g.hsla.to=function(a){if(a[0]==null||a[1]==null||a[2]==null)return[null,null,null,a[3]];var b=a[0]/255,c=a[1]/255,d=a[2]/255,e=a[3],f=Math.max(b,c,d),g=Math.min(b,c,d),h=f-g,i=f+g,j=i*.5,k,l;return g===f?k=0:b===f?k=60*(c-d)/h+360:c===f?k=60*(d-b)/h+120:k=60*(b-c)/h+240,h===0?l=0:j<=.5?l=h/i:l=h/(2-i),[Math.round(k)%360,l,j,e==null?1:e]},g.hsla.from=function(a){if(a[0]==null||a[1]==null||a[2]==null)return[null,null,null,a[3]];var b=a[0]/360,c=a[1],d=a[2],e=a[3],f=d<=.5?d*(1+c):d+c-d*c,g=2*d-f;return[Math.round(o(g,f,b+1/3)*255),Math.round(o(g,f,b)*255),Math.round(o(g,f,b-1/3)*255),e]},l(g,function(c,e){var g=e.props,h=e.cache,i=e.to,j=e.from;f.fn[c]=function(c){i&&!this[h]&&(this[h]=i(this._rgba));if(c===b)return this[h].slice();var d,e=a.type(c),k=e==="array"||e==="object"?c:arguments,n=this[h].slice();return l(g,function(a,b){var c=k[e==="object"?a:b.idx];c==null&&(c=n[b.idx]),n[b.idx]=m(c,b)}),j?(d=f(j(n)),d[h]=n,d):f(n)},l(g,function(b,e){if(f.fn[b])return;f.fn[b]=function(f){var g=a.type(f),h=b==="alpha"?this._hsla?"hsla":"rgba":c,i=this[h](),j=i[e.idx],k;return g==="undefined"?j:(g==="function"&&(f=f.call(this,j),g=a.type(f)),f==null&&e.empty?this:(g==="string"&&(k=d.exec(f),k&&(f=j+parseFloat(k[2])*(k[1]==="+"?1:-1))),i[e.idx]=f,this[h](i)))}})}),f.hook=function(b){var c=b.split(" ");l(c,function(b,c){a.cssHooks[c]={set:function(b,d){var e,g,h="";if(d!=="transparent"&&(a.type(d)!=="string"||(e=n(d)))){d=f(e||d);if(!i.rgba&&d._rgba[3]!==1){g=c==="backgroundColor"?b.parentNode:b;while((h===""||h==="transparent")&&g&&g.style)try{h=a.css(g,"backgroundColor"),g=g.parentNode}catch(j){}d=d.blend(h&&h!=="transparent"?h:"_default")}d=d.toRgbaString()}try{b.style[c]=d}catch(j){}}},a.fx.step[c]=function(b){b.colorInit||(b.start=f(b.elem,c),b.end=f(b.end),b.colorInit=!0),a.cssHooks[c].set(b.elem,b.start.transition(b.end,b.pos))}})},f.hook(c),a.cssHooks.borderColor={expand:function(a){var b={};return l(["Top","Right","Bottom","Left"],function(c,d){b["border"+d+"Color"]=a}),b}},k=a.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}})(jQuery);
  


    (function(e){var o="left",n="right",d="up",v="down",c="in",w="out",l="none",r="auto",k="swipe",s="pinch",x="tap",i="doubletap",b="longtap",A="horizontal",t="vertical",h="all",q=10,f="start",j="move",g="end",p="cancel",a="ontouchstart" in window,y="TouchSwipe";var m={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"button, input, select, textarea, a, .noSwipe"};e.fn.swipe=function(D){var C=e(this),B=C.data(y);if(B&&typeof D==="string"){if(B[D]){return B[D].apply(this,Array.prototype.slice.call(arguments,1))}else{e.error("Method "+D+" does not exist on jQuery.swipe")}}else{if(!B&&(typeof D==="object"||!D)){return u.apply(this,arguments)}}return C};e.fn.swipe.defaults=m;e.fn.swipe.phases={PHASE_START:f,PHASE_MOVE:j,PHASE_END:g,PHASE_CANCEL:p};e.fn.swipe.directions={LEFT:o,RIGHT:n,UP:d,DOWN:v,IN:c,OUT:w};e.fn.swipe.pageScroll={NONE:l,HORIZONTAL:A,VERTICAL:t,AUTO:r};e.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:h};function u(B){if(B&&(B.allowPageScroll===undefined&&(B.swipe!==undefined||B.swipeStatus!==undefined))){B.allowPageScroll=l}if(B.click!==undefined&&B.tap===undefined){B.tap=B.click}if(!B){B={}}B=e.extend({},e.fn.swipe.defaults,B);return this.each(function(){var D=e(this);var C=D.data(y);if(!C){C=new z(this,B);D.data(y,C)}})}function z(a0,aq){var av=(a||!aq.fallbackToMouseEvents),G=av?"touchstart":"mousedown",au=av?"touchmove":"mousemove",R=av?"touchend":"mouseup",P=av?null:"mouseleave",az="touchcancel";var ac=0,aL=null,Y=0,aX=0,aV=0,D=1,am=0,aF=0,J=null;var aN=e(a0);var W="start";var T=0;var aM=null;var Q=0,aY=0,a1=0,aa=0,K=0;var aS=null;try{aN.bind(G,aJ);aN.bind(az,a5)}catch(ag){e.error("events not supported "+G+","+az+" on jQuery.swipe")}this.enable=function(){aN.bind(G,aJ);aN.bind(az,a5);return aN};this.disable=function(){aG();return aN};this.destroy=function(){aG();aN.data(y,null);return aN};this.option=function(a8,a7){if(aq[a8]!==undefined){if(a7===undefined){return aq[a8]}else{aq[a8]=a7}}else{e.error("Option "+a8+" does not exist on jQuery.swipe.options")}};function aJ(a9){if(ax()){return}if(e(a9.target).closest(aq.excludedElements,aN).length>0){return}var ba=a9.originalEvent?a9.originalEvent:a9;var a8,a7=a?ba.touches[0]:ba;W=f;if(a){T=ba.touches.length}else{a9.preventDefault()}ac=0;aL=null;aF=null;Y=0;aX=0;aV=0;D=1;am=0;aM=af();J=X();O();if(!a||(T===aq.fingers||aq.fingers===h)||aT()){ae(0,a7);Q=ao();if(T==2){ae(1,ba.touches[1]);aX=aV=ap(aM[0].start,aM[1].start)}if(aq.swipeStatus||aq.pinchStatus){a8=L(ba,W)}}else{a8=false}if(a8===false){W=p;L(ba,W);return a8}else{ak(true)}}function aZ(ba){var bd=ba.originalEvent?ba.originalEvent:ba;if(W===g||W===p||ai()){return}var a9,a8=a?bd.touches[0]:bd;var bb=aD(a8);aY=ao();if(a){T=bd.touches.length}W=j;if(T==2){if(aX==0){ae(1,bd.touches[1]);aX=aV=ap(aM[0].start,aM[1].start)}else{aD(bd.touches[1]);aV=ap(aM[0].end,aM[1].end);aF=an(aM[0].end,aM[1].end)}D=a3(aX,aV);am=Math.abs(aX-aV)}if((T===aq.fingers||aq.fingers===h)||!a||aT()){aL=aH(bb.start,bb.end);ah(ba,aL);ac=aO(bb.start,bb.end);Y=aI();aE(aL,ac);if(aq.swipeStatus||aq.pinchStatus){a9=L(bd,W)}if(!aq.triggerOnTouchEnd||aq.triggerOnTouchLeave){var a7=true;if(aq.triggerOnTouchLeave){var bc=aU(this);a7=B(bb.end,bc)}if(!aq.triggerOnTouchEnd&&a7){W=ay(j)}else{if(aq.triggerOnTouchLeave&&!a7){W=ay(g)}}if(W==p||W==g){L(bd,W)}}}else{W=p;L(bd,W)}if(a9===false){W=p;L(bd,W)}}function I(a7){var a8=a7.originalEvent;if(a){if(a8.touches.length>0){C();return true}}if(ai()){T=aa}a7.preventDefault();aY=ao();Y=aI();if(a6()){W=p;L(a8,W)}else{if(aq.triggerOnTouchEnd||(aq.triggerOnTouchEnd==false&&W===j)){W=g;L(a8,W)}else{if(!aq.triggerOnTouchEnd&&a2()){W=g;aB(a8,W,x)}else{if(W===j){W=p;L(a8,W)}}}}ak(false)}function a5(){T=0;aY=0;Q=0;aX=0;aV=0;D=1;O();ak(false)}function H(a7){var a8=a7.originalEvent;if(aq.triggerOnTouchLeave){W=ay(g);L(a8,W)}}function aG(){aN.unbind(G,aJ);aN.unbind(az,a5);aN.unbind(au,aZ);aN.unbind(R,I);if(P){aN.unbind(P,H)}ak(false)}function ay(bb){var ba=bb;var a9=aw();var a8=aj();var a7=a6();if(!a9||a7){ba=p}else{if(a8&&bb==j&&(!aq.triggerOnTouchEnd||aq.triggerOnTouchLeave)){ba=g}else{if(!a8&&bb==g&&aq.triggerOnTouchLeave){ba=p}}}return ba}function L(a9,a7){var a8=undefined;if(F()||S()){a8=aB(a9,a7,k)}else{if((M()||aT())&&a8!==false){a8=aB(a9,a7,s)}}if(aC()&&a8!==false){a8=aB(a9,a7,i)}else{if(al()&&a8!==false){a8=aB(a9,a7,b)}else{if(ad()&&a8!==false){a8=aB(a9,a7,x)}}}if(a7===p){a5(a9)}if(a7===g){if(a){if(a9.touches.length==0){a5(a9)}}else{a5(a9)}}return a8}function aB(ba,a7,a9){var a8=undefined;if(a9==k){aN.trigger("swipeStatus",[a7,aL||null,ac||0,Y||0,T]);if(aq.swipeStatus){a8=aq.swipeStatus.call(aN,ba,a7,aL||null,ac||0,Y||0,T);if(a8===false){return false}}if(a7==g&&aR()){aN.trigger("swipe",[aL,ac,Y,T]);if(aq.swipe){a8=aq.swipe.call(aN,ba,aL,ac,Y,T);if(a8===false){return false}}switch(aL){case o:aN.trigger("swipeLeft",[aL,ac,Y,T]);if(aq.swipeLeft){a8=aq.swipeLeft.call(aN,ba,aL,ac,Y,T)}break;case n:aN.trigger("swipeRight",[aL,ac,Y,T]);if(aq.swipeRight){a8=aq.swipeRight.call(aN,ba,aL,ac,Y,T)}break;case d:aN.trigger("swipeUp",[aL,ac,Y,T]);if(aq.swipeUp){a8=aq.swipeUp.call(aN,ba,aL,ac,Y,T)}break;case v:aN.trigger("swipeDown",[aL,ac,Y,T]);if(aq.swipeDown){a8=aq.swipeDown.call(aN,ba,aL,ac,Y,T)}break}}}if(a9==s){aN.trigger("pinchStatus",[a7,aF||null,am||0,Y||0,T,D]);if(aq.pinchStatus){a8=aq.pinchStatus.call(aN,ba,a7,aF||null,am||0,Y||0,T,D);if(a8===false){return false}}if(a7==g&&a4()){switch(aF){case c:aN.trigger("pinchIn",[aF||null,am||0,Y||0,T,D]);if(aq.pinchIn){a8=aq.pinchIn.call(aN,ba,aF||null,am||0,Y||0,T,D)}break;case w:aN.trigger("pinchOut",[aF||null,am||0,Y||0,T,D]);if(aq.pinchOut){a8=aq.pinchOut.call(aN,ba,aF||null,am||0,Y||0,T,D)}break}}}if(a9==x){if(a7===p||a7===g){clearTimeout(aS);if(V()&&!E()){K=ao();aS=setTimeout(e.proxy(function(){K=null;aN.trigger("tap",[ba.target]);if(aq.tap){a8=aq.tap.call(aN,ba,ba.target)}},this),aq.doubleTapThreshold)}else{K=null;aN.trigger("tap",[ba.target]);if(aq.tap){a8=aq.tap.call(aN,ba,ba.target)}}}}else{if(a9==i){if(a7===p||a7===g){clearTimeout(aS);K=null;aN.trigger("doubletap",[ba.target]);if(aq.doubleTap){a8=aq.doubleTap.call(aN,ba,ba.target)}}}else{if(a9==b){if(a7===p||a7===g){clearTimeout(aS);K=null;aN.trigger("longtap",[ba.target]);if(aq.longTap){a8=aq.longTap.call(aN,ba,ba.target)}}}}}return a8}function aj(){var a7=true;if(aq.threshold!==null){a7=ac>=aq.threshold}return a7}function a6(){var a7=false;if(aq.cancelThreshold!==null&&aL!==null){a7=(aP(aL)-ac)>=aq.cancelThreshold}return a7}function ab(){if(aq.pinchThreshold!==null){return am>=aq.pinchThreshold}return true}function aw(){var a7;if(aq.maxTimeThreshold){if(Y>=aq.maxTimeThreshold){a7=false}else{a7=true}}else{a7=true}return a7}function ah(a7,a8){if(aq.allowPageScroll===l||aT()){a7.preventDefault()}else{var a9=aq.allowPageScroll===r;switch(a8){case o:if((aq.swipeLeft&&a9)||(!a9&&aq.allowPageScroll!=A)){a7.preventDefault()}break;case n:if((aq.swipeRight&&a9)||(!a9&&aq.allowPageScroll!=A)){a7.preventDefault()}break;case d:if((aq.swipeUp&&a9)||(!a9&&aq.allowPageScroll!=t)){a7.preventDefault()}break;case v:if((aq.swipeDown&&a9)||(!a9&&aq.allowPageScroll!=t)){a7.preventDefault()}break}}}function a4(){var a8=aK();var a7=U();var a9=ab();return a8&&a7&&a9}function aT(){return !!(aq.pinchStatus||aq.pinchIn||aq.pinchOut)}function M(){return !!(a4()&&aT())}function aR(){var ba=aw();var bc=aj();var a9=aK();var a7=U();var a8=a6();var bb=!a8&&a7&&a9&&bc&&ba;return bb}function S(){return !!(aq.swipe||aq.swipeStatus||aq.swipeLeft||aq.swipeRight||aq.swipeUp||aq.swipeDown)}function F(){return !!(aR()&&S())}function aK(){return((T===aq.fingers||aq.fingers===h)||!a)}function U(){return aM[0].end.x!==0}function a2(){return !!(aq.tap)}function V(){return !!(aq.doubleTap)}function aQ(){return !!(aq.longTap)}function N(){if(K==null){return false}var a7=ao();return(V()&&((a7-K)<=aq.doubleTapThreshold))}function E(){return N()}function at(){return((T===1||!a)&&(isNaN(ac)||ac===0))}function aW(){return((Y>aq.longTapThreshold)&&(ac<q))}function ad(){return !!(at()&&a2())}function aC(){return !!(N()&&V())}function al(){return !!(aW()&&aQ())}function C(){a1=ao();aa=event.touches.length+1}function O(){a1=0;aa=0}function ai(){var a7=false;if(a1){var a8=ao()-a1;if(a8<=aq.fingerReleaseThreshold){a7=true}}return a7}function ax(){return !!(aN.data(y+"_intouch")===true)}function ak(a7){if(a7===true){aN.bind(au,aZ);aN.bind(R,I);if(P){aN.bind(P,H)}}else{aN.unbind(au,aZ,false);aN.unbind(R,I,false);if(P){aN.unbind(P,H,false)}}aN.data(y+"_intouch",a7===true)}function ae(a8,a7){var a9=a7.identifier!==undefined?a7.identifier:0;aM[a8].identifier=a9;aM[a8].start.x=aM[a8].end.x=a7.pageX||a7.clientX;aM[a8].start.y=aM[a8].end.y=a7.pageY||a7.clientY;return aM[a8]}function aD(a7){var a9=a7.identifier!==undefined?a7.identifier:0;var a8=Z(a9);a8.end.x=a7.pageX||a7.clientX;a8.end.y=a7.pageY||a7.clientY;return a8}function Z(a8){for(var a7=0;a7<aM.length;a7++){if(aM[a7].identifier==a8){return aM[a7]}}}function af(){var a7=[];for(var a8=0;a8<=5;a8++){a7.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return a7}function aE(a7,a8){a8=Math.max(a8,aP(a7));J[a7].distance=a8}function aP(a7){return J[a7].distance}function X(){var a7={};a7[o]=ar(o);a7[n]=ar(n);a7[d]=ar(d);a7[v]=ar(v);return a7}function ar(a7){return{direction:a7,distance:0}}function aI(){return aY-Q}function ap(ba,a9){var a8=Math.abs(ba.x-a9.x);var a7=Math.abs(ba.y-a9.y);return Math.round(Math.sqrt(a8*a8+a7*a7))}function a3(a7,a8){var a9=(a8/a7)*1;return a9.toFixed(2)}function an(){if(D<1){return w}else{return c}}function aO(a8,a7){return Math.round(Math.sqrt(Math.pow(a7.x-a8.x,2)+Math.pow(a7.y-a8.y,2)))}function aA(ba,a8){var a7=ba.x-a8.x;var bc=a8.y-ba.y;var a9=Math.atan2(bc,a7);var bb=Math.round(a9*180/Math.PI);if(bb<0){bb=360-Math.abs(bb)}return bb}function aH(a8,a7){var a9=aA(a8,a7);if((a9<=45)&&(a9>=0)){return o}else{if((a9<=360)&&(a9>=315)){return o}else{if((a9>=135)&&(a9<=225)){return n}else{if((a9>45)&&(a9<135)){return v}else{return d}}}}}function ao(){var a7=new Date();return a7.getTime()}function aU(a7){a7=e(a7);var a9=a7.offset();var a8={left:a9.left,right:a9.left+a7.outerWidth(),top:a9.top,bottom:a9.top+a7.outerHeight()};return a8}function B(a7,a8){return(a7.x>a8.left&&a7.x<a8.right&&a7.y>a8.top&&a7.y<a8.bottom)}}})(jQuery);


});