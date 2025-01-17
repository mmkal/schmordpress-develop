/* eslint-disable no-console */
/**
 * External dependencies
 */
const fs = require( 'fs' );
const path = require( 'path' );

/**
 * Constants
 */
const BLOCK_LIBRARY_SRC = 'node_modules/@schmordpress/block-library/src/';

const REPOSITORY_ROOT = path.dirname( path.dirname( __dirname ) );

/**
 * The main function of this task.
 *
 * Refreshes the PHP files referring to stable @schmordpress/block-library blocks.
 */
function main() {
	const blocks = getStableBlocksMetadata();
	const toolWarningMessage = '// This file was autogenerated by tools/release/sync-stable-blocks.js, do not change manually!';

	// wp-includes/blocks/require-blocks.php
	console.log( 'Refreshing wp-includes/blocks/require-static-blocks.php...' );
	const staticBlockFolderNames = blocks
		.filter( ( metadata ) => ! isDynamic( metadata ) )
		.map( toDirectoryName )
		.sort()
		// To the block folder name statement:
		.map( dirname => `	'${ dirname }',` )
		.join( "\n" );

	fs.writeFileSync(
		`${ REPOSITORY_ROOT }/src/wp-includes/blocks/require-static-blocks.php`,
		`<?php

${ toolWarningMessage }
// Returns folder names for static blocks necessary for core blocks registration.
return array(
${ staticBlockFolderNames }
);
`,
	);

	// wp-includes/blocks/require-blocks.php
	console.log( 'Refreshing wp-includes/blocks/require-dynamic-blocks.php...' );
	const dynamicBlockFileRequires = blocks
		.filter( isDynamic )
		.map( toDirectoryName )
		.sort()
		// To PHP require_once statement:
		.map( dirname => `require_once ABSPATH . WPINC . '/blocks/${ dirname }.php';` )
		.join( "\n" );

	fs.writeFileSync(
		`${ REPOSITORY_ROOT }/src/wp-includes/blocks/require-dynamic-blocks.php`,
		`<?php

${ toolWarningMessage }
// Requires files for dynamic blocks necessary for core blocks registration.
${ dynamicBlockFileRequires }
`,
	);

	// tests/phpunit/includes/unregister-blocks-hooks.php
	console.log( 'Refreshing tests/phpunit/includes/unregister-blocks-hooks.php...' );
	const unregisterHooks = blocks.filter( isDynamic )
		.map( function toHookName( metadata ) {
			const php = fs.readFileSync( path.join( metadata.path, '..', 'index.php' ) ).toString();
			let hookName = php.substring( php.indexOf( "add_action( 'init', 'register_block_core_" ) );
			return hookName.split( "'" )[ 3 ];
		} )
		.sort()
		.map( function toUnregisterCall( hookName ) {
			return `remove_action( 'init', '${ hookName }' );`;
		} )
		.join( "\n" );

	fs.writeFileSync(
		`${ REPOSITORY_ROOT }/tests/phpunit/includes/unregister-blocks-hooks.php`,
		`<?php

${ toolWarningMessage }
${ unregisterHooks }
`,
	);
	console.log( 'Done!' );
}

/**
 * Returns a list of unserialized block.json metadata of the
 * stable blocks shipped with the currently installed version
 * of the @schmordpress/block-library package/
 *
 * @return {Array} List of stable blocks metadata.
 */
function getStableBlocksMetadata() {
	return (
		fs.readdirSync( BLOCK_LIBRARY_SRC )
			.map( dirMaybe => path.join( BLOCK_LIBRARY_SRC, dirMaybe, 'block.json' ) )
			.filter( fs.existsSync )
			.map( blockJsonPath => ( {
				...JSON.parse( fs.readFileSync( blockJsonPath ) ),
				path: blockJsonPath,
			} ) )
			.filter( metadata => (
				!( '__experimental' in metadata ) || metadata.__experimental === false
			) )
	);
}

/**
 * Returns true if the specified metadata refers to a dynamic block.
 *
 * @param {Object} metadata Block metadata in question.
 * @return {boolean} Is it a dynamic block?
 */
function isDynamic( metadata ) {
	return (
		fs.existsSync( path.join( metadata.path, '..', 'index.php' ) )
	);
}

/**
 * Returns a name of the directory where a given block resides.
 *
 * @param {Object} metadata Block metadata in question.
 * @return {string} Parent directory name.
 */
function toDirectoryName( metadata ) {
	return (
		path.basename( path.dirname( metadata.path ) )
	);
}

module.exports = {
	main,
	isDynamic,
	toDirectoryName,
	getStableBlocksMetadata,
};

/* eslint-enable no-console */
