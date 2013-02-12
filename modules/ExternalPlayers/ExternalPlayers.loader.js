( function( mw, $ ) { "use strict";

	// Add supported external players:
	$( mw ).bind('EmbedPlayerUpdateMediaPlayers', function( event, mediaPlayers ){
		
		var youTubePlayer = new mw.MediaPlayer( 'youTube', ['video/youtube'], 'YouTube' );
		mediaPlayers.addPlayer( youTubePlayer );
		mediaPlayers.defaultPlayers['video/youtube'] = [ 'YouTube' ];
		
	});

	// Setup the check for KalturaSupport_AddExternalMedia event
	$( mw ).bind( 'EmbedPlayerNewPlayer', function(event, embedPlayer){
		$( embedPlayer ).bind( 'KalturaSupport_AddExternalMedia', function(event, entryMeta){
			switch( entryMeta.externalSourceType ){
				case 'YouTube':
					var src = entryMeta.creditUrl;
					if ( embedPlayer.getFlashvars( 'forceYoutubeEntry' ) ) {
						src = '//www.youtube.com/watch?' + embedPlayer.getFlashvars( 'forceYoutubeEntry' );
					}
					embedPlayer.mediaElement.tryAddSource( 
						$('<soruce>').attr({
							'src' : src,
							'type': 'video/youtube'
						})
					)
				break;
				default:
					mw.log( "Error: Unknown external type: " + entryMeta.externalSourceType );
				break;
			}
		})
	});

} )( window.mw, window.jQuery );