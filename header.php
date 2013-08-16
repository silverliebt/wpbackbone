<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package JaSper
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width" />
<title>Cam O'Connell dot com</title>
<link rel="profile" href="http://gmpg.org/xfn/11" /> 
<!--[if lt IE 9]>
<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js" type="text/javascript"></script>
<![endif]--> 
 
<?php wp_head(); ?>
</head>

<body >
 
 
  <div class="preloader pt-page-ontop">
    <div class="outer">
      <div class="inner"></div>
    </div>

    <ul class="stripes bg">
      <!-- add stripes using js -->
    </ul> 
  </div> 
   
	<?php do_action( 'before' ); ?>
	<header id="masthead" class="site-header" role="banner">
        <div class='inner  '>
            
            <nav id="site-navigation" class="navigation-main" role="navigation">
                <h1 class="menu-toggle"><?php _e( 'Menu', 'nmf' ); ?></h1>
                <div class="screen-reader-text skip-link"><a href="#content" title="<?php esc_attr_e( 'Skip to content', 'nmf' ); ?>"><?php _e( 'Skip to content', 'nmf' ); ?></a></div>
    
                <?php  
                    wp_nav_menu( array(
                        'walker' => new My_Walker()
                    )); 
                ?>
            </nav><!-- #site-navigation -->
        </div>

        <div class="upward  "> <div class="btn">
          <div class=" arrow-up"></div>
        </div> </div>
	</header><!-- #masthead --> 
 
  <article id="content" class="site-content" role="main" >