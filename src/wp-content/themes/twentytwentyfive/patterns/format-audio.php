<?php
/**
 * Title: Audio format
 * Slug: twentytwentyfive/format-audio
 * Categories: twentytwentyfive_post-format, featured
 * Description: An audio post format with an image, title, audio player, and description.
 *
 * @package SchmordPress
 * @subpackage Twenty_Twenty_Five
 * @since Twenty Twenty-Five 1.0
 */

?>
<!-- wp:group {"metadata":{"name":"Audio format"},"className":"is-style-section-3","style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group is-style-section-3" style="padding-top:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--30)">
	<!-- wp:columns {"isStackedOnMobile":false,"style":{"spacing":{"blockGap":{"left":"var:preset|spacing|30"}}}} -->
	<div class="wp-block-columns is-not-stacked-on-mobile">
		<!-- wp:column {"width":"100px"} -->
		<div class="wp-block-column" style="flex-basis:100px"><!-- wp:image {"width":"100px","height":"auto","aspectRatio":"1","scale":"cover","sizeSlug":"full","linkDestination":"none"} -->
		<figure class="wp-block-image size-full is-resized"><img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/image-from-rawpixel-id-8802835-jpeg-scaled.webp' ); ?>" alt="Event image" style="aspect-ratio:1;object-fit:cover;width:100px;height:auto"/></figure>
		<!-- /wp:image --></div>
		<!-- /wp:column -->

		<!-- wp:column {"width":""} -->
		<div class="wp-block-column"><!-- wp:paragraph -->
		<p>Episode 1: Acoma Pueblo with Prof. Fiona Presley</p>
		<!-- /wp:paragraph -->

		<!-- wp:paragraph {"fontSize":"small"} -->
		<p class="has-small-font-size">Acoma Pueblo, in New Mexico, stands as a testament to the resilience and cultural heritage of the Acoma people</p>
		<!-- /wp:paragraph -->

		<!-- wp:audio -->
		<figure class="wp-block-audio"><audio controls src="#"></audio></figure>
		<!-- /wp:audio --></div>
		<!-- /wp:column --></div>
	<!-- /wp:columns --></div>
<!-- /wp:group -->