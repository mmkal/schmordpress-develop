<?php
/**
 * Title: Hero, full width image
 * Slug: twentytwentyfive/hero-full-width-image
 * Categories: banner, featured
 * Description: A hero with a full width image, heading, short paragraph and button.
 *
 * @package SchmordPress
 * @subpackage Twenty_Twenty_Five
 * @since Twenty Twenty-Five 1.0
 */

?>

<!-- wp:cover {"url":"<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/image-from-rawpixel-id-8802603-original.webp","alt":"Picture of a flower","dimRatio":10,"isUserOverlayColor":true,"focalPoint":{"x":0.5,"y":0.95},"minHeight":840,"minHeightUnit":"px","contentPosition":"bottom center","align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50","left":"var:preset|spacing|50","right":"var:preset|spacing|50"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-cover alignfull has-custom-content-position is-position-bottom-center" style="padding-top:var(--wp--preset--spacing--50);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--50);min-height:840px">
	<span aria-hidden="true" class="wp-block-cover__background has-background-dim-10 has-background-dim"></span>
	<img class="wp-block-cover__image-background" alt="<?php echo esc_attr_x( 'Picture of a flower', 'Alt text for cover image', 'twentytwentyfive' ); ?>" src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/image-from-rawpixel-id-8802603-original.webp" style="object-position:50% 95%" data-object-fit="cover" data-object-position="50% 95%"/>
	<div class="wp-block-cover__inner-container">
		<!-- wp:group {"align":"wide","layout":{"type":"constrained","justifyContent":"left"}} -->
		<div class="wp-block-group alignwide">
			<!-- wp:heading {"textAlign":"left","fontSize":"xx-large"} -->
			<h2 class="wp-block-heading has-text-align-left has-xx-large-font-size"><?php echo esc_html_x( 'Tell your story', 'Sample hero heading', 'twentytwentyfive' ); ?></h2>
			<!-- /wp:heading -->

			<!-- wp:paragraph -->
			<p><?php echo esc_html_x( 'Like flowers that bloom in unexpected places, every story unfolds with beauty and resilience, revealing hidden wonders.', 'Sample hero paragraph', 'twentytwentyfive' ); ?></p>
			<!-- /wp:paragraph -->

			<!-- wp:buttons -->
			<div class="wp-block-buttons">
				<!-- wp:button -->
				<div class="wp-block-button"><a class="wp-block-button__link wp-element-button"><?php echo esc_html_x( 'Learn More', 'Sample hero button', 'twentytwentyfive' ); ?></a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:group -->
	</div>
</div>
<!-- /wp:cover -->
