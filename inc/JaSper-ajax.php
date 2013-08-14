<?php
function request_handler() { 

	global $linkedIn;

	// gotta check the nonce!
	$nonce = $_POST['ajaxCustomNonce'];
	if ( ! wp_verify_nonce( $nonce, 'ajax_custom_nonce' ) ) 
		 die ('Space');
		 

	$id = $_POST['id']; 
	  
	switch ($id) {   
		case 'posts':
			require_once(TEMPLATEPATH . '/inc/JaSper-posts.php'); 
			load_posts();
			break;
		case 'linkedin':
			$linkedIn->get_linkedin();
			break;		
	}
	
	die();
}

add_action("wp_ajax_nopriv_request_handler", "request_handler");
add_action("wp_ajax_request_handler", "request_handler");