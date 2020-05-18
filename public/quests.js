/***********
 * GLOBALS *
 ***********/
var quest_rows = document.getElementsByClassName( "quest-container" );
var save_data = null;
var storage_enabled = typeof( Storage ) !== "undefined";

/*************
 * CALLBACKS *
 *************/
function onQuestMarkerChange( checkbox, index ) {
	var row = checkbox.parentElement.parentElement; // get main row
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
		var checkbox = getQuestColumn( quest_rows[ index ], INDEX_CHECK ).getElementsByTagName( "input" )[ 0 ];
		checkbox.checked = false;
		onQuestMarkerChange( checkbox, index + 1 ); // Add 1 because it takes quest number, not index, blame Handlebars
	}
}

/********************
 * HELPER FUNCTIONS *
 ********************/
function sortTable( table_rows, sort_func ) {
	var parent = table_rows[ 0 ].parentElement;
	var arrayed_elements = [].slice.call( table_rows ); // Workaround to convert the table to an array
	arrayed_elements.sort( sort_func ); // Sort
	arrayed_elements.forEach( element => parent.appendChild( element ) ); // And put the elements back in
	// Since appendChild removes the element from its previous parent, the old ordering is erased automatically
}

function getQuestMainRow( quest_div ) {
	return quest_div.getElementsByClassName( "quest-row" )[ 0 ];
}

function getQuestSubrow( quest_div ) {
	return quest_div.getElementsByClassName( "quest-subrow" )[ 0 ];
}

function getQuestColumn( quest_div, column ) {
	return getQuestMainRow( quest_div ).getElementsByTagName( "td" )[ column ];
}

/******************
 * SORT FUNCTIONS *
 ******************/
function sortByNum() {
	sortTable( quest_rows, function( row1, row2 ) {
		const INDEX_NUM = 1;
		var num_1 = parseInt( row1.getElementsByTagName( "td" )[ INDEX_NUM ].textContent );
		var num_2 = parseInt( row2.getElementsByTagName( "td" )[ INDEX_NUM ].textContent );
		return num_1 > num_2;
	} );
}

function sortByTitle() {
	sortTable( quest_rows, function( row1, row2 ) {
		const INDEX_TITLE = 2;
		var title_1 = row1.getElementsByTagName( "td" )[ INDEX_TITLE ].textContent;
		var title_2 = row2.getElementsByTagName( "td" )[ INDEX_TITLE ].textContent;
		return title_1 > title_2;
	} );
}

function sortByClient() {
	sortTable( quest_rows, function( row1, row2 ) {
		const INDEX_CLIENT = 3;
		var client_1 = row1.getElementsByTagName( "td" )[ INDEX_CLIENT ].textContent;
		var client_2 = row2.getElementsByTagName( "td" )[ INDEX_CLIENT ].textContent;
		return client_1 > client_2;
	} );
}

function sortByArea() {
	sortTable( quest_rows, function( row1, row2 ) {
		const INDEX_AREA = 4;
		var area_1 = row1.getElementsByTagName( "td" )[ INDEX_AREA ].textContent;
		var area_2 = row2.getElementsByTagName( "td" )[ INDEX_AREA ].textContent;
		return area_1 > area_2;
	} );
}

/******************
 * INIT FUNCTIONS *
 ******************/
function initSaveData( storage ) {
	if( !storage ) {
		console.log( "Web storage is disabled, unable to store data between sessions" );
		return [];
	}
	
	if( !localStorage.getItem( "quests" ) ) {
		return [];
	}
	
	return JSON.parse( localStorage.getItem( "quests" ) );
}

function initRows( rows, save_data ) {
	const INDEX_CHECK = 0;
	
	for( var index = 0; index < quest_rows.length; ++index ) {
		// Init rows from storage
		var elements = quest_rows[ index ].getElementsByTagName( "td" );
		var checkbox = elements[ INDEX_CHECK ].getElementsByTagName( "input" )[ 0 ];

		if( storage_enabled ) {
			checkbox.checked = save_data[ index ];
			onQuestMarkerChange( checkbox, index + 1 ); // Add 1 for above reason
		}
	}
}

/**************
 * INITIALIZE *
 **************/
// Init the save data
save_data = initSaveData( storage_enabled );

// Initialize rows
initRows( quest_rows, save_data );

