<?php
/*
	Template Name: Home
*/ 
get_header(); ?>
    
    <section id='home' class="page" >
        
        <!-- Scrollable content -->
        <div class="inner scrollpane"> 

            <div class="logo-wrap">   
	            <div id="logo-home-holder">
	            	<div id="logo-home"></div>
	            </div>
	            <div class="logo-backing">
	            	<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width="142.1" height="223.1" viewBox="0" enable-background="new 0 0 142.104 223.094" xml:space="preserve">
	            		<path opacity="1" fill="#c95a5d" d="M111.7 113.6C102 88.7 90 54 90 54s1.5-0.5 2-11c0-19-17-23-17-23l0.5-11c0 0 0.5-8-5.5-7.5s-7.7 7.1-7.7 7.1L62.5 20c0 0-10.5 5.5-15 14S50 56.5 50 56.5l-48 134 1 28 18.5-21L69.5 71 115 203l23.5-16C138.5 187 121.5 138.5 111.7 113.6zM75 52c-4.5 3-2 2.5-6.5 1.5S62 49 59.5 47s-2.5-6 0-9.5 8-5 10.5-5 10.5 5 10.5 9S79.5 49 75 52z"/>
	            	</svg>
	            </div>
	            <div class="circle-mask">
	            	<div class="brushstroke"></div>
	        		<ul class="grid vert"></ul>
	        		<ul class="grid hori"></ul>
	        	</div>
	        </div>

            <!-- Title -->
            <h1><?php the_field('title'); ?></h1>

            <div class="dressing">
	            <div class="left">
	                <div id="left-motif"></div>
	            </div>
	            <div class="middle">&nbsp</div>
	            <div class="right">
	                <div id="right-motif"></div>
	            </div>
	        </div>
                  
        </div>  
 
    </section>
<?php get_footer(); ?>