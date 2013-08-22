<?php
/*
	Template Name: For Fun
*/ 
get_header(); ?>
    
    <section id='fun' class="page">

        <!-- Scrollable content -->
        <div class="inner scrollpane"> 
            
            <!-- Title -->
            <h1><?php the_field('content'); ?></h1> 

            

	 		<section id='lazylinepainter' class="page tOpacity demo">
	  			<?php  

	  				$lazylineId = getIdFromSlug('fun/lazyline');

					if( get_field('lazylinepaintings' , $lazylineId ) ): ?>
					 
						<div class="slideshow"> 
							<?php while( has_sub_field('lazylinepaintings' , $lazylineId ) ): ?>
						 
								<div class="slide">
									<div class="inner <?php the_sub_field( 'title'  , $lazylineId ); ?>">

										<?php if( get_sub_field( 'lazyline' , $lazylineId ) ): ?>
											  
											<?php while( has_sub_field('lazyline' , $lazylineId )): ?>
										  
												<div id="<?php the_sub_field('key' , $lazylineId ); ?>"></div>

											<?php endwhile; ?> 
									 
										<?php endif; ?>
									</div>
								</div>

							<?php endwhile; ?>
						</div>
					 
					<?php 
					endif; 
				?>
			</section>

        </div>
    </section>
<?php get_footer(); ?>