/***********
 * GLOBALS *
 ***********/
var quest_rows = document.getElementsByClassName( "quest-row" );
var save_data = null;
var storage_enabled = typeof( Storage ) !== "undefined";

/*************
 * CALLBACKS *
 *************/
function onQuestMarkerChange( checkbox, index ) {
	var row = checkbox.parentElement.parentElement;
	index = index - 1; // Switch from 1-index to 0-index
	if( checkbox.checked ) {
		row.classList.add( "row-complete" );
		if( storage_enabled ) {
			save_data[ index ] = true;
			localStorage.setItem( "quests", JSON.stringify( save_data ) );
		}
	} else {
		row.classList.remove( "row-complete" );
		if( storage_enabled ) {
			save_data[ index ] = false;
			localStorage.setItem( "quests", JSON.stringify( save_data ) );
		}
	}
}

function onClearQuests() {
	const INDEX_CHECK = 0;

	for( var index = 0; index < quest_rows.length; ++index ) {
		var elements = quest_rows[ index ].getElementsByTagName( "td" );
		var checkbox = elements[ INDEX_CHECK ].getElementsByTagName( "input" )[ 0 ];

		checkbox.checked = false;
		onQuestMarkerChange( checkbox, index + 1 ); // Add 1 because it takes quest number, not index, blame Handlebars
	}
}

/**************
 * INITIALIZE *
 **************/
// Check local storage
if( !storage_enabled ) {
	console.log( "Web storage is disabled, unable to store data between sessions" );
} else {
	if( !localStorage.getItem( "quests" ) ) {
		save_data = [];
	} else {
		save_data = JSON.parse( localStorage.getItem( "quests" ) );
	}
}

// Initialize rows
for( var index = 0; index < quest_rows.length; ++index ) {
	const INDEX_CHECK = 0;

	// Init rows from storage
	var elements = quest_rows[ index ].getElementsByTagName( "td" );
	var checkbox = elements[ INDEX_CHECK ].getElementsByTagName( "input" )[ 0 ];

	if( storage_enabled ) {
		checkbox.checked = save_data[ index ];
		onQuestMarkerChange( checkbox, index + 1 ); // Add 1 for above reason
	}
}
