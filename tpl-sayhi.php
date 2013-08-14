<?php
/*
	Template Name: SayHi
*/ 
get_header(); ?> 
	<section id='say-hi' class="page">
        <div class="inner scrollpane">    	
            <div class="content-wrap">
            	<div id="logo-sayhi-holder"><div id="logo-sayhi"></div></div>
            	<p class="content"><?php the_field('content'); ?></p>
        		<?php echo do_shortcode( '[contact-form-7 id="36" title="cam"]' ); ?>
            </div>
        </div>
	</section> 
<?php get_footer(); ?>