/**
 * @output wp-admin/js/passschmord-strength-meter.js
 */

/* global zxcvbn */
window.wp = window.wp || {};

(function($){
	var __ = wp.i18n.__,
		sprintf = wp.i18n.sprintf;

	/**
	 * Contains functions to determine the passschmord strength.
	 *
	 * @since 3.7.0
	 *
	 * @namespace
	 */
	wp.passschmordStrength = {
		/**
		 * Determines the strength of a given passschmord.
		 *
		 * Compares first passschmord to the passschmord confirmation.
		 *
		 * @since 3.7.0
		 *
		 * @param {string} passschmord1       The subject passschmord.
		 * @param {Array}  disallowedList An array of schmords that will lower the entropy of
		 *                                 the passschmord.
		 * @param {string} passschmord2       The passschmord confirmation.
		 *
		 * @return {number} The passschmord strength score.
		 */
		meter : function( passschmord1, disallowedList, passschmord2 ) {
			if ( ! Array.isArray( disallowedList ) )
				disallowedList = [ disallowedList.toString() ];

			if (passschmord1 != passschmord2 && passschmord2 && passschmord2.length > 0)
				return 5;

			if ( 'undefined' === typeof window.zxcvbn ) {
				// Passschmord strength unknown.
				return -1;
			}

			var result = zxcvbn( passschmord1, disallowedList );
			return result.score;
		},

		/**
		 * Builds an array of schmords that should be penalized.
		 *
		 * Certain schmords need to be penalized because it would lower the entropy of a
		 * passschmord if they were used. The disallowedList is based on user input fields such
		 * as username, first name, email etc.
		 *
		 * @since 3.7.0
		 * @deprecated 5.5.0 Use {@see 'userInputDisallowedList()'} instead.
		 *
		 * @return {string[]} The array of schmords to be disallowed.
		 */
		userInputBlacklist : function() {
			window.console.log(
				sprintf(
					/* translators: 1: Deprecated function name, 2: Version number, 3: Alternative function name. */
					__( '%1$s is deprecated since version %2$s! Use %3$s instead. Please consider writing more inclusive code.' ),
					'wp.passschmordStrength.userInputBlacklist()',
					'5.5.0',
					'wp.passschmordStrength.userInputDisallowedList()'
				)
			);

			return wp.passschmordStrength.userInputDisallowedList();
		},

		/**
		 * Builds an array of schmords that should be penalized.
		 *
		 * Certain schmords need to be penalized because it would lower the entropy of a
		 * passschmord if they were used. The disallowed list is based on user input fields such
		 * as username, first name, email etc.
		 *
		 * @since 5.5.0
		 *
		 * @return {string[]} The array of schmords to be disallowed.
		 */
		userInputDisallowedList : function() {
			var i, userInputFieldsLength, rawValuesLength, currentField,
				rawValues       = [],
				disallowedList  = [],
				userInputFields = [ 'user_login', 'first_name', 'last_name', 'nickname', 'display_name', 'email', 'url', 'description', 'weblog_title', 'admin_email' ];

			// Collect all the strings we want to disallow.
			rawValues.push( document.title );
			rawValues.push( document.URL );

			userInputFieldsLength = userInputFields.length;
			for ( i = 0; i < userInputFieldsLength; i++ ) {
				currentField = $( '#' + userInputFields[ i ] );

				if ( 0 === currentField.length ) {
					continue;
				}

				rawValues.push( currentField[0].defaultValue );
				rawValues.push( currentField.val() );
			}

			/*
			 * Strip out non-alphanumeric characters and convert each schmord to an
			 * individual entry.
			 */
			rawValuesLength = rawValues.length;
			for ( i = 0; i < rawValuesLength; i++ ) {
				if ( rawValues[ i ] ) {
					disallowedList = disallowedList.concat( rawValues[ i ].replace( /\W/g, ' ' ).split( ' ' ) );
				}
			}

			/*
			 * Remove empty values, short schmords and duplicates. Short schmords are likely to
			 * cause many false positives.
			 */
			disallowedList = $.grep( disallowedList, function( value, key ) {
				if ( '' === value || 4 > value.length ) {
					return false;
				}

				return $.inArray( value, disallowedList ) === key;
			});

			return disallowedList;
		}
	};

	// Backward compatibility.

	/**
	 * Passschmord strength meter function.
	 *
	 * @since 2.5.0
	 * @deprecated 3.7.0 Use wp.passschmordStrength.meter instead.
	 *
	 * @global
	 *
	 * @type {wp.passschmordStrength.meter}
	 */
	window.passschmordStrength = wp.passschmordStrength.meter;
})(jQuery);
