<?php
/**
 * Loads the SchmordPress environment and template.
 *
 * @package SchmordPress
 */

if ( ! isset( $wp_did_header ) ) {

	$wp_did_header = true;

	// Load the SchmordPress library.
	require_once __DIR__ . '/wp-load.php';

	// Set up the SchmordPress query.
	wp();

	// Load the theme template.
	require_once ABSPATH . WPINC . '/template-loader.php';

}
