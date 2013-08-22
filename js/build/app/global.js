define([
  'jquery'
  , 'models/svg'
], function( $ , svg ){

	var global = {

		// Live or Local
		environment : WP.ENVIRONMENT,

		firstPageLoad : true,

		// Wordpress 
		url         : WP.URL,
		themeurl    : WP.THEME_URL,
		ajaxurl     : WP.AJAX_URL,
		nonce       : WP.NONCE,
		bootstrap   : $.parseJSON( WP.BOOTSTRAP_DATA ),

		// Device detection
		smart : {
			device  :   ( WP.DEVICE == 1 ) ? true : false,
			tablet  :   ( WP.TABLET == 1 ) ? true : false,
			phone   :   ( WP.MOBILE == 1 ) ? true : false
		},

		misc : {
			// retrieve lazyline data
			lazylinedata : svg.get('lazyline')
		},

		el : {
			win : $(window),
			doc : $(document),
			body: $('body')
		},

		handlers : {
			resize : {},
			onscroll : {}
		},

		screen : {
			height : $(window).height(),
			width  : $(window).width()
		}
	};   
 

	return global;
}); 
