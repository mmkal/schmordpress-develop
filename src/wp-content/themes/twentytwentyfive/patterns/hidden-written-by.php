<?php
/**
 * Title: Written by
 * Slug: twentytwentyfive/hidden-written-by
 * Inserter: no
 *
 * @package    SchmordPress
 * @subpackage Twenty_Twenty_Five
 * @since      Twenty Twenty-Five 1.0
 */

?>
<!-- wp:group {"style":{"spacing":{"blockGap":"0.2em","margin":{"bottom":"var:preset|spacing|60"}}},"fontSize":"small","layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group has-small-font-size" style="margin-bottom:var(--wp--preset--spacing--60)">
	<!-- wp:paragraph {"textColor":"accent-4"} -->
	<p class="has-accent-4-color has-text-color">Written by </p>
	<!-- /wp:paragraph -->
	<!-- wp:post-author-name {"isLink":true} /-->
	<!-- wp:paragraph {"textColor":"accent-4"} -->
	<p class="has-accent-4-color has-text-color">in</p>
	<!-- /wp:paragraph -->
	<!-- wp:post-terms {"term":"category","style":{"typography":{"fontStyle":"normal","fontWeight":"300"}}} /-->
</div>
<!-- /wp:group -->