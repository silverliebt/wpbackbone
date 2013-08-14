<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the id=main div and all content after
 * 
 */
?>
 
</article><!-- #content -->

<footer id="colophon" class="site-footer tAll" role="contentinfo">

    <a href="<?php the_field('cv', getIdFromSlug('work')); ?>" target="_blank" class="cv"><h1>C V</h1></a>

    <div class="social-btns clearfix">
	    <div class="twitter"><a href="https://twitter.com/camoconnell" target="_blank" ><h1 class="btn">Tw</h1></a></div>
	    <div class="behance"><a href="http://www.behance.net/camoconnell" target="_blank" ><h1 class="btn">Be</h1></a></div>
	    <div class="github"><a href="https://github.com/camoconnell" target="_blank" ><h1 class="btn">Gh</h1></a></div>
	    <div class="linkedin"><a href="http://www.linkedin.com/profile/view?id=151402235" target="_blank" ><h1 class="btn">in</h1></a></div>
	</div>
    
    
</footer><!-- #colophon -->

<?php wp_footer(); ?>

</body>
</html>