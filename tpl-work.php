<?php
/*
	Template Name: Work
*/ 
get_header(); ?>
    
    <section id='work' class="page">

    	<?php include(TEMPLATEPATH . '/inc/touchswipe.php'); ?>
        
        <!-- Scrollable content -->
        <div class="inner scrollpane"> 

    	    <div class="key wide clearfix">
                <div class="design">
                    <div class="design-icon icon"></div>
                    <p>Design</p> 
                </div> 
                <div class="development">
                    <div class="development-icon icon"></div>
                    <p>Development</p> 
                </div> 
                <div class="motion">
                    <div class="motion-icon icon"></div>
                    <p>Motion</p> 
                </div> 
            </div>

            <div class="wide description" ><?php  the_field('content'); ?></div>

            <div class="content-wrap">

	            <?php if( get_field('job') ): ?>
	                <?php while( has_sub_field('job') ): ?>
	                    <div class="item clearfix">
 
                            <?php  
                                if(get_sub_field('awardz')): 
                                	while( has_sub_field('awardz') ): ?> 
	                            		<a href="<?php  the_sub_field('link'); ?>" class="<?php  the_sub_field('award'); ?> award" target="_blank"></a>

	                            	<?php  
                                    endwhile;  
                             	endif; 
                             ?>
		                    <div class="slideshow">
		                    	
		                    	<div class="slide ">
		                    		<?php if(get_sub_field('logo')):  ?>
			                    		<div class="logo tOpacity"><img src="<?php echo  the_sub_field('logo'); ?>" alt="me photo" /></div>
			                    	<?php  endif; ?>
			                    	<div class="hero-image">
				                        <img src="<?php echo get_image( get_sub_field('hero') ); ?>" alt="me photo" class="out" />
				                        
				                        <?php 
				                        	global $detect; 
				                        	if( !$detect->isMobile() ): 
				                        ?> 
				                        	<img src="<?php echo get_image( get_sub_field('hero_over') ); ?>" alt="me photo" class="over tOpacity" />
				                        <?php endif; ?>
				                    </div>
				                </div>

				                <?php if( get_sub_field('video') ): ?> 
							        <div class="slide video"> 
							         	<?php echo  the_sub_field('video'); ?>
					                </div> 
								<?php endif; ?>

								<?php if( get_sub_field('photos') ): ?>
								    <?php while( has_sub_field('photos') ): ?>
								        <div class="slide"> 
								         	<img src="<?php echo get_image( get_sub_field('photo') ); ?>" />
						                </div>
								    <?php endwhile; ?>
								<?php endif; ?>
							
			                </div>

			                <div class="information">
			                	<h1 class="title"><?php echo  the_sub_field('title'); ?></h1>
			                	<div class="positions">
	                                <?php  
	                                    if(get_sub_field('positions'))
	                                    { 
	                                        $choices = get_sub_field('positions');

	                                        foreach( $choices as $choice )
	                                        {
	                                            ?><div class="<?php echo $choice; ?>-icon icon"></div><?php 
	                                        }
	                                    }
	                                ?>  
	                                
	                            </div> 
			                	<p class="content">
			                		<?php echo  the_sub_field('description'); ?>
			                		<br />
			                		<?php if(get_sub_field('behance_link')):  ?>
			                    		<a href="<?php echo  the_sub_field('behance_link'); ?>" target="_blank">More info</a>
			                    	<?php  endif; ?>
			                	</p>
			                </div>
	                    </div>
	                <?php endwhile; ?>
	            <?php endif; ?>
	        </div>
        </div>  
 
    </section>
<?php get_footer(); ?>