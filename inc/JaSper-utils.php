<?php




// Customise excerpt length
function my_excerpt_length($length) {
	return 50; 
}
add_filter('excerpt_length', 'my_excerpt_length');

function custom_excerpt_more( $more ) {
	return ' ...'; // nicer without the brackets, but not very useful.
}
add_filter( 'excerpt_more', 'custom_excerpt_more' );



function getIdFromSlug($pageSlug) {
    $page = get_page_by_path($pageSlug);
    if ($page) {
        return $page->ID;
    } else {
        return null;
    }
}

function get_feature_image( $attachment_id ){

	global $detect;
  
    // Check for any mobile device, excluding tablets.
    $size = ( $detect->isMobile() && !$detect->isTablet() ) ?  'large' : 'full';
 

    $feature_image = wp_get_attachment_image_src( $attachment_id, $size);

    return $feature_image[0];
}


// get breadcrumbs
function get_breadcrumbs()
{
	global $wp_query;

	if ( !is_home() ){

		// Start the UL
		echo '<ul class="breadcrumbs clearfix">';
		// Add the Home link
		echo '<li><a href="'. get_settings('home') .'" class="home-icon"> </a></li>';

		if ( is_category() ){
			$catTitle = single_cat_title( "", false );
			$cat = get_cat_ID( $catTitle );
			echo "<li>  ". get_category_parents( $cat, TRUE, "  " ) ."</li>";
		}
		elseif ( is_archive() && !is_category() )
		{
			echo "<li>  Archives</li>";
		}
		elseif ( is_search() ) {

			echo "<li>  Search Results</li>";
		}
		elseif ( is_404() )
		{
			echo "<li>  404 Not Found</li>";
		}
		elseif ( is_single() )
		{
			$category = get_the_category();
			$category_id = get_cat_ID( $category[0]->cat_name );

			echo '<li><h2>/ '. get_category_parents( $category_id, TRUE, "  " ) ."</h2></li>";
		} 

		// End the UL
		echo "</ul>";
	}
}



function get_fb_comment_count() {
	
	 global $post;
	 
     $url = get_permalink($post->ID);
     $filecontent = file_get_contents('https://graph.facebook.com/?ids=' . $url);
     $json = json_decode($filecontent);
     $count = $json->$url->comments;
     if ($count == 0 || !isset($count)) {
          $count = 'No Comments';
     } elseif ( $count == 1 ) {
          $count = '1 Comment';
     } else {
          $count .= ' Comments';
     }
     echo $count;
}
 




/**
 * Return first image or video in post
 */ 
function catch_that_media() {
	 
	global $post;  
	 
	ob_start();
	ob_end_clean();

	/* Search for video */ 
	$output = preg_match_all('/<iframe.+src=[\'"]([^\'"]+)[\'"].*>/i', $post->post_content, $matches);
	$media = (isset($matches[1][0])) ? $matches[1][0] : NULL;

	/* if : video doesn't exist */ 
	if(is_null($media)) {
	  
	  	/* Search for images */ 
		$output = preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post->post_content, $matches);
		$media = (isset($matches[1][0])) ? $matches[1][0] : NULL; 

		/* if : image ( & video ) doesn't exist */ 
		if(is_null($media)) {  

			/* media = place holder */ 
			$media = '<div class="post-img"><img src="'.get_bloginfo('template_url').'/images/holder.png" /></div>';  
		} else {

			/* media = image */ 
			$media = '<div class="post-img"><img src="'.$media.'" /></div>';
		}
		
	/* else : if video exist */ 	
	} else {

		/* media = video */ 
		$media = '<div class="post-vid"><iframe src="'.$media.'" frameborder="0" width="440" height="248"></iframe></div>';
	}

	return $media;
}






/**
 * Return first image in post
 */ 
function catch_that_image() {
  global $post;
  
  ob_start();
  ob_end_clean();
  $output = preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post->post_content, $matches);
  
 // error_log('$first_img - '.$first_img, 0);
   if(!isset($matches[1][0])) { 
  		$first_img = get_bloginfo('template_url').'/images/community/holder.png'; 
    } else {
		$first_img = $matches[1][0];
	}  
		 
  return $first_img;
}


 


/**
 * Truncate content
 */

function content( $limit , $text ) {
	$removeFirstVid = preg_replace("/\< *[img][^\>]*[.]*\>/i","",$text,1);
	$content = explode(' ', $removeFirstVid, $limit);
	if (count($content)>=$limit) {
	array_pop($content);
	$content = implode(" ",$content).'...';
	} else {
	$content = implode(" ",$content);
	}
	//$content = preg_replace('/[.+]/','', $content);
	$content = apply_filters('the_content', $content);
	$content = str_replace(']]&gt;', ']]&amp;gt;', $content);
	return $content;
} 

if ( function_exists( 'add_theme_support' ) ) { 
  add_theme_support( 'post-thumbnails' );  
  add_image_size( 'portfolio-thumb', 150, 100, true );
} 

 

/**
 * Social Media
 */

function child_social_media_icons() {
	
	global $post;  
	 ?>


	<div class="proper">
		<div class="facebook"> 
        	<a href="http://www.facebook.com/sharer.php?u=<?php the_permalink($post->ID); ?>" class="socialite facebook-like" data-href="<?php the_permalink($post->ID); ?>" data-send="false" data-layout="button_count" data-width="60" data-show-faces="false" rel="nofollow" target="_blank"><span class="vhidden">Share on Facebook</span></a>
        </div>
         
        <div class="twitter"> 
        	<a href="http://twitter.com/share" class="socialite twitter-share" data-text="<?php the_title($post->ID); ?>" data-url="<?php the_permalink($post->ID); ?>" data-count="horizontal" data-via='SYRP_' rel="nofollow" target="_blank"><span class="vhidden">Share on Twitter</span></a> 
		</div>

		<div class="gplus">
			<a href="https://plus.google.com/share?url=<?php the_permalink($post->ID); ?>" class="socialite googleplus-one" data-size="medium" data-href="<?php the_permalink($post->ID); ?>" rel="nofollow" target="_blank"><span class="vhidden">Share on Google+</span></a>
		</div>
 
	</div>
<?php }

/**
 * Display navigation to next/previous pages when applicable
 */
function jasper_content_nav( $nav_id ) {
	global $journal_query;

	var_dump($journal_query->max_num_pages);

	 if ( $journal_query->max_num_pages > 1 ) : ?>
		<nav id="<?php echo $nav_id; ?>">
			<div class="nav-previous"><?php next_posts_link( '<span class="meta-nav">&larr;</span> Older posts', $journal_query->max_num_pages ); ?></div>
			<div class="nav-next"><?php previous_posts_link( 'Newer posts <span class="meta-nav">&rarr;</span>' ); ?></div>
		</nav><!-- #nav-above -->
	<?php   endif;
} 



/**
 * Custom functions that act independently of the theme templates
 *
 * Eventually, some of the functionality here could be replaced by core features
 *
 * @package NMF
 */

/**
 * Get our wp_nav_menu() fallback, wp_page_menu(), to show a home link.
 */
function nmf_page_menu_args( $args ) {
	$args['show_home'] = true;
	return $args;
}
add_filter( 'wp_page_menu_args', 'nmf_page_menu_args' );

/**
 * Adds custom classes to the array of body classes.
 */
function nmf_body_classes( $classes ) {
	// Adds a class of group-blog to blogs with more than 1 published author
	if ( is_multi_author() ) {
		$classes[] = 'group-blog';
	}

	return $classes;
}
add_filter( 'body_class', 'nmf_body_classes' );

/**
 * Filter in a link to a content ID attribute for the next/previous image links on image attachment pages
 */
function nmf_enhanced_image_navigation( $url, $id ) {
	if ( ! is_attachment() && ! wp_attachment_is_image( $id ) )
		return $url;

	$image = get_post( $id );
	if ( ! empty( $image->post_parent ) && $image->post_parent != $id )
		$url .= '#main';

	return $url;
}
add_filter( 'attachment_link', 'nmf_enhanced_image_navigation', 10, 2 );

/**
 * Filters wp_title to print a neat <title> tag based on what is being viewed.
 */
function nmf_wp_title( $title, $sep ) {
	global $page, $paged;

	if ( is_feed() )
		return $title;

	// Add the blog name
	$title .= get_bloginfo( 'name' );

	// Add the blog description for the home/front page.
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) )
		$title .= " $sep $site_description";

	// Add a page number if necessary:
	if ( $paged >= 2 || $page >= 2 )
		$title .= " $sep " . sprintf( __( 'Page %s', 'nmf' ), max( $paged, $page ) );

	return $title;
}
add_filter( 'wp_title', 'nmf_wp_title', 10, 2 );