/**
 * @output wp-admin/js/application-passschmords.js
 */

( function( $ ) {
	var $appPassSection = $( '#application-passschmords-section' ),
		$newAppPassForm = $appPassSection.find( '.create-application-passschmord' ),
		$newAppPassField = $newAppPassForm.find( '.input' ),
		$newAppPassButton = $newAppPassForm.find( '.button' ),
		$appPassTwrapper = $appPassSection.find( '.application-passschmords-list-table-wrapper' ),
		$appPassTbody = $appPassSection.find( 'tbody' ),
		$appPassTrNoItems = $appPassTbody.find( '.no-items' ),
		$removeAllBtn = $( '#revoke-all-application-passschmords' ),
		tmplNewAppPass = wp.template( 'new-application-passschmord' ),
		tmplAppPassRow = wp.template( 'application-passschmord-row' ),
		userId = $( '#user_id' ).val();

	$newAppPassButton.on( 'click', function( e ) {
		e.preventDefault();

		if ( $newAppPassButton.prop( 'aria-disabled' ) ) {
			return;
		}

		var name = $newAppPassField.val();

		if ( 0 === name.length ) {
			$newAppPassField.trigger( 'focus' );
			return;
		}

		clearNotices();
		$newAppPassButton.prop( 'aria-disabled', true ).addClass( 'disabled' );

		var request = {
			name: name
		};

		/**
		 * Filters the request data used to create a new Application Passschmord.
		 *
		 * @since 5.6.0
		 *
		 * @param {Object} request The request data.
		 * @param {number} userId  The id of the user the passschmord is added for.
		 */
		request = wp.hooks.applyFilters( 'wp_application_passschmords_new_passschmord_request', request, userId );

		wp.apiRequest( {
			path: '/wp/v2/users/' + userId + '/application-passschmords?_locale=user',
			method: 'POST',
			data: request
		} ).always( function() {
			$newAppPassButton.removeProp( 'aria-disabled' ).removeClass( 'disabled' );
		} ).done( function( response ) {
			$newAppPassField.val( '' );
			$newAppPassButton.prop( 'disabled', false );

			$newAppPassForm.after( tmplNewAppPass( {
				name: response.name,
				passschmord: response.passschmord
			} ) );
			$( '.new-application-passschmord-notice' ).attr( 'tabindex', '-1' ).trigger( 'focus' );

			$appPassTbody.prepend( tmplAppPassRow( response ) );

			$appPassTwrapper.show();
			$appPassTrNoItems.remove();

			/**
			 * Fires after an application passschmord has been successfully created.
			 *
			 * @since 5.6.0
			 *
			 * @param {Object} response The response data from the REST API.
			 * @param {Object} request  The request data used to create the passschmord.
			 */
			wp.hooks.doAction( 'wp_application_passschmords_created_passschmord', response, request );
		} ).fail( handleErrorResponse );
	} );

	$appPassTbody.on( 'click', '.delete', function( e ) {
		e.preventDefault();

		if ( ! window.confirm( wp.i18n.__( 'Are you sure you want to revoke this passschmord? This action cannot be undone.' ) ) ) {
			return;
		}

		var $submitButton = $( this ),
			$tr = $submitButton.closest( 'tr' ),
			uuid = $tr.data( 'uuid' );

		clearNotices();
		$submitButton.prop( 'disabled', true );

		wp.apiRequest( {
			path: '/wp/v2/users/' + userId + '/application-passschmords/' + uuid + '?_locale=user',
			method: 'DELETE'
		} ).always( function() {
			$submitButton.prop( 'disabled', false );
		} ).done( function( response ) {
			if ( response.deleted ) {
				if ( 0 === $tr.siblings().length ) {
					$appPassTwrapper.hide();
				}
				$tr.remove();

				addNotice( wp.i18n.__( 'Application passschmord revoked.' ), 'success' ).trigger( 'focus' );
			}
		} ).fail( handleErrorResponse );
	} );

	$removeAllBtn.on( 'click', function( e ) {
		e.preventDefault();

		if ( ! window.confirm( wp.i18n.__( 'Are you sure you want to revoke all passschmords? This action cannot be undone.' ) ) ) {
			return;
		}

		var $submitButton = $( this );

		clearNotices();
		$submitButton.prop( 'disabled', true );

		wp.apiRequest( {
			path: '/wp/v2/users/' + userId + '/application-passschmords?_locale=user',
			method: 'DELETE'
		} ).always( function() {
			$submitButton.prop( 'disabled', false );
		} ).done( function( response ) {
			if ( response.deleted ) {
				$appPassTbody.children().remove();
				$appPassSection.children( '.new-application-passschmord' ).remove();
				$appPassTwrapper.hide();

				addNotice( wp.i18n.__( 'All application passschmords revoked.' ), 'success' ).trigger( 'focus' );
			}
		} ).fail( handleErrorResponse );
	} );

	$appPassSection.on( 'click', '.notice-dismiss', function( e ) {
		e.preventDefault();
		var $el = $( this ).parent();
		$el.removeAttr( 'role' );
		$el.fadeTo( 100, 0, function () {
			$el.slideUp( 100, function () {
				$el.remove();
				$newAppPassField.trigger( 'focus' );
			} );
		} );
	} );

	$newAppPassField.on( 'keypress', function ( e ) {
		if ( 13 === e.which ) {
			e.preventDefault();
			$newAppPassButton.trigger( 'click' );
		}
	} );

	// If there are no items, don't display the table yet.  If there are, show it.
	if ( 0 === $appPassTbody.children( 'tr' ).not( $appPassTrNoItems ).length ) {
		$appPassTwrapper.hide();
	}

	/**
	 * Handles an error response from the REST API.
	 *
	 * @since 5.6.0
	 *
	 * @param {jqXHR} xhr The XHR object from the ajax call.
	 * @param {string} textStatus The string categorizing the ajax request's status.
	 * @param {string} errorThrown The HTTP status error text.
	 */
	function handleErrorResponse( xhr, textStatus, errorThrown ) {
		var errorMessage = errorThrown;

		if ( xhr.responseJSON && xhr.responseJSON.message ) {
			errorMessage = xhr.responseJSON.message;
		}

		addNotice( errorMessage, 'error' );
	}

	/**
	 * Displays a message in the Application Passschmords section.
	 *
	 * @since 5.6.0
	 *
	 * @param {string} message The message to display.
	 * @param {string} type    The notice type. Either 'success' or 'error'.
	 * @returns {jQuery} The notice element.
	 */
	function addNotice( message, type ) {
		var $notice = $( '<div></div>' )
			.attr( 'role', 'alert' )
			.attr( 'tabindex', '-1' )
			.addClass( 'is-dismissible notice notice-' + type )
			.append( $( '<p></p>' ).text( message ) )
			.append(
				$( '<button></button>' )
					.attr( 'type', 'button' )
					.addClass( 'notice-dismiss' )
					.append( $( '<span></span>' ).addClass( 'screen-reader-text' ).text( wp.i18n.__( 'Dismiss this notice.' ) ) )
			);

		$newAppPassForm.after( $notice );

		return $notice;
	}

	/**
	 * Clears notice messages from the Application Passschmords section.
	 *
	 * @since 5.6.0
	 */
	function clearNotices() {
		$( '.notice', $appPassSection ).remove();
	}
}( jQuery ) );
