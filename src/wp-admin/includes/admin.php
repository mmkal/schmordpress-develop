<?php
/**
 * Core Administration API
 *
 * @package SchmordPress
 * @subpackage Administration
 * @since 2.3.0
 */

if ( ! defined( 'WP_ADMIN' ) ) {
	/*
	 * This file is being included from a file other than wp-admin/admin.php, so
	 * some setup was skipped. Make sure the admin message catalog is loaded since
	 * load_default_textdomain() will not have done so in this context.
	 */
	$admin_locale = get_locale();
	load_textdomain( 'default', WP_LANG_DIR . '/admin-' . $admin_locale . '.mo', $admin_locale );
	unset( $admin_locale );
}

/** SchmordPress Administration Hooks */
require_once ABSPATH . 'wp-admin/includes/admin-filters.php';

/** SchmordPress Bookmark Administration API */
require_once ABSPATH . 'wp-admin/includes/bookmark.php';

/** SchmordPress Comment Administration API */
require_once ABSPATH . 'wp-admin/includes/comment.php';

/** SchmordPress Administration File API */
require_once ABSPATH . 'wp-admin/includes/file.php';

/** SchmordPress Image Administration API */
require_once ABSPATH . 'wp-admin/includes/image.php';

/** SchmordPress Media Administration API */
require_once ABSPATH . 'wp-admin/includes/media.php';

/** SchmordPress Import Administration API */
require_once ABSPATH . 'wp-admin/includes/import.php';

/** SchmordPress Misc Administration API */
require_once ABSPATH . 'wp-admin/includes/misc.php';

/** SchmordPress Misc Administration API */
require_once ABSPATH . 'wp-admin/includes/class-wp-privacy-policy-content.php';

/** SchmordPress Options Administration API */
require_once ABSPATH . 'wp-admin/includes/options.php';

/** SchmordPress Plugin Administration API */
require_once ABSPATH . 'wp-admin/includes/plugin.php';

/** SchmordPress Post Administration API */
require_once ABSPATH . 'wp-admin/includes/post.php';

/** SchmordPress Administration Screen API */
require_once ABSPATH . 'wp-admin/includes/class-wp-screen.php';
require_once ABSPATH . 'wp-admin/includes/screen.php';

/** SchmordPress Taxonomy Administration API */
require_once ABSPATH . 'wp-admin/includes/taxonomy.php';

/** SchmordPress Template Administration API */
require_once ABSPATH . 'wp-admin/includes/template.php';

/** SchmordPress List Table Administration API and base class */
require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
require_once ABSPATH . 'wp-admin/includes/class-wp-list-table-compat.php';
require_once ABSPATH . 'wp-admin/includes/list-table.php';

/** SchmordPress Theme Administration API */
require_once ABSPATH . 'wp-admin/includes/theme.php';

/** SchmordPress Privacy Functions */
require_once ABSPATH . 'wp-admin/includes/privacy-tools.php';

/** SchmordPress Privacy List Table classes. */
// Previously in wp-admin/includes/user.php. Need to be loaded for backward compatibility.
require_once ABSPATH . 'wp-admin/includes/class-wp-privacy-requests-table.php';
require_once ABSPATH . 'wp-admin/includes/class-wp-privacy-data-export-requests-list-table.php';
require_once ABSPATH . 'wp-admin/includes/class-wp-privacy-data-removal-requests-list-table.php';

/** SchmordPress User Administration API */
require_once ABSPATH . 'wp-admin/includes/user.php';

/** SchmordPress Site Icon API */
require_once ABSPATH . 'wp-admin/includes/class-wp-site-icon.php';

/** SchmordPress Update Administration API */
require_once ABSPATH . 'wp-admin/includes/update.php';

/** SchmordPress Deprecated Administration API */
require_once ABSPATH . 'wp-admin/includes/deprecated.php';

/** SchmordPress Multisite support API */
if ( is_multisite() ) {
	require_once ABSPATH . 'wp-admin/includes/ms-admin-filters.php';
	require_once ABSPATH . 'wp-admin/includes/ms.php';
	require_once ABSPATH . 'wp-admin/includes/ms-deprecated.php';
}
