<?php
function load_posts(){
	?> 
	<?php
	$cat_name = $_POST['cat_name'];
	$num_of_posts = $_POST['num_of_posts'];
	$paged = $_POST['paged'];  
	
	$journal_query = new WP_Query(array(
	  'category_name'      => $cat_name,
	  'posts_per_page'     => $num_of_posts,
	  'orderby'            => 'date', 
	  'order'              => 'DESC',
	  'paged'			   => $paged
	));  
			 
			
	while ($journal_query->have_posts()) : $journal_query->the_post();   
		 
		include(TEMPLATEPATH.'/entry.php');

	endwhile; 
	
	?> 
	<?php
	wp_reset_query(); 
}