<?php
/**
 * The Template for displaying all single posts.
 *
 * @package JaSper
 */

get_header(); ?>
 
<section id="single">
	<div class="inner">
		<div class="content-wrap" data-id="<?php echo $post->ID ?>"> 

			<div class="post-title-wrap narrow skew">
            	<div class="post-title-outer">
                	<h2 class="post-title-inner"><?php the_title()?></h2>
	        		<div class="date"><?php the_time(" j.n.y ");?></div>
                </div>
                <div class="clear"></div>
            </div>

			<div  class='post-inner'> 

		        <div class="category-wrap">

		        </div> 


		        <div class="copy-wrap narrow">
	 				<!-- Social Media -->
			        <div class="social-media-icons skew">
			            <div class="holder"> 
			                <div class="facebook button"><h4>LIKE</h4></div>
			                <div class="twitter button"><h4>TWEET</h4></div>
			                <div class="gplus button"><h4>g PLUS</h4></div> 
			            </div>
			            <?php child_social_media_icons() ?>
			        </div> 		        	
		            <div class="image-clip"></div>
		            <div class="copy"><?php the_field('copy'); ?></div>
		        </div>


		        <div class="slideshow-wrapper wide">
					<div class="preloader"></div>
					<ul class="content-panel" data-orbit>
				    	<?php if (get_field('video') != NULL): ?> 
				        	<li class='content-panel-vimeo post-vid'><?php echo get_field('video') ?></li> 
				        <?php endif; ?> 
						 
						<?php if( get_field('gallery') ):

							while( has_sub_field('gallery') ):

				                $attachment_id = get_sub_field('gallery_image');
				                $image = wp_get_attachment_image_src( $attachment_id, $image_size );

				                // full image fallback for mobiles
				                if( is_null($image) ) $image = wp_get_attachment_image_src( $attachment_id, 'full' );

				                ?>
				                <li><img src="<?php echo $image[0]; ?>" /></li>
				            
				            <?php endwhile; ?> 
				        <?php endif; ?>  
					</ul>
				</div>

		        <div class="footer narrow">  
		        </div>
				<div class="image-clip narrow"></div> 
		    </div> 
		</div>
	</div> 

    <div class="background" style="background-image:url('<?php echo get_feature_image( get_field('feature_image') ); ?>')" ></div>

</section><!-- #primary -->

	

<?php get_footer(); ?>