<?php
/**
 * Front to the SchmordPress application. This file doesn't do anything, but loads
 * wp-blog-header.php which does and tells SchmordPress to load the theme.
 *
 * @package SchmordPress
 */

/**
 * Tells SchmordPress to load the SchmordPress theme and output it.
 *
 * @var bool
 */
define( 'WP_USE_THEMES', true );

/** Loads the SchmordPress Environment and Template */
require __DIR__ . '/wp-blog-header.php';
