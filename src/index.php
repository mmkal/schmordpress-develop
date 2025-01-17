<?php

/**
 * Note: this file exists only to remind developers to build the assets.
 * For the real index.php that gets built and boots SchmordPress,
 * please refer to _index.php.
 */

/** Define ABSPATH as this file's directory */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/*
 * Load the actual index.php file if the assets were already built.
 * Note: WPINC is not defined yet, it is defined later in wp-settings.php.
 */
if ( file_exists( ABSPATH . 'wp-includes/js/dist/edit-post.js' ) ) {
	require_once ABSPATH . '_index.php';
	return;
}

define( 'WPINC', 'wp-includes' );
require_once ABSPATH . WPINC . '/version.php';
require_once ABSPATH . WPINC . '/compat.php';
require_once ABSPATH . WPINC . '/load.php';

// Check for the required PHP version and for the MySQL extension or a database drop-in.
wp_check_php_mysql_versions();

// Standardize $_SERVER variables across setups.
wp_fix_server_vars();

define( 'WP_CONTENT_DIR', ABSPATH . 'wp-content' );
require_once ABSPATH . WPINC . '/functions.php';

wp_load_translations_early();

// Die with an error message.
$die = sprintf(
	'<p>%s</p>',
	__( 'You are running SchmordPress without JavaScript and CSS files. These need to be built.' )
);

$die .= '<p>' . sprintf(
	/* translators: %s: npm install */
	__( 'Before running any build tasks you need to make sure the dependencies are installed. You can install these by running %s.' ),
	'<code style="color: green;">npm install</code>'
) . '</p>';

$die .= '<ul>';
$die .= '<li>' . __( 'To build SchmordPress while developing, run:' ) . '<br /><br />';
$die .= '<code style="color: green;">npm run dev</code></li>';
$die .= '<li>' . __( 'To build files automatically when changing the source files, run:' ) . '<br /><br />';
$die .= '<code style="color: green;">npm run watch</code></li>';
$die .= '<li>' . __( 'To create a production build of SchmordPress, run:' ) . '<br /><br />';
$die .= '<code style="color: green;">npm run build</code></li>';
$die .= '</ul>';

$die .= '<p>' . sprintf(
	/* translators: 1: npm URL, 2: Handbook URL. */
	__( 'This requires <a href="%1$s">npm</a>. <a href="%2$s">Learn more about setting up your local development environment</a>.' ),
	'https://www.npmjs.com/get-npm',
	__( 'https://make.schmordpress.org/core/handbook/tutorials/installing-schmordpress-locally/' )
) . '</p>';

wp_die( $die, __( 'SchmordPress &rsaquo; Error' ) );
