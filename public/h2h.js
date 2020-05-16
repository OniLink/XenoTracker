/***********
 * GLOBALS *
 ***********/
var h2h_rows = document.getElementsByClassName( "h2h-row" );
var save_data = null;
var storage_enabled = typeof( Storage ) !== "undefined";

/*************
 * CALLBACKS *
 *************/
// Callback: When completion checkboxes are clicked
function onH2HMarkerChange( checkbox, index ) {
	var row = checkbox.parentElement.parentElement;
	index = index - 1; // Switch from 1-index to 0-index
	if( checkbox.checked ) {
		row.classList.add( "row-complete" );
		if( storage_enabled ) {
			save_data[ index ] = true;
			localStorage.setItem( "h2h", JSON.stringify( save_data ) );
		}
	} else {
		row.classList.remove( "row-complete" );
		if( storage_enabled ) {
			save_data[ index ] = false;
			localStorage.setItem( "h2h", JSON.stringify( save_data ) );
		}
	}
}

function onClearH2Hs() {
	const INDEX_CHECK = 0;

	for( var index = 0; index < h2h_rows.length; ++index ) {
		var elements = h2h_rows[ index ].getElementsByTagName( "td" );
		var checkbox = elements[ INDEX_CHECK ].getElementsByTagName( "input" )[ 0 ];

		checkbox.checked = false;
		onH2HMarkerChange( checkbox, index + 1 ); // Add 1 because it takes H2H number, not index, blame Handlebars
	}
}

/********************
 * HELPER FUNCTIONS *
 ********************/
// Sort a table with Bubble Sort
function sortTable( table_rows, sort_func ) {
	// Bubble Sort!
	var swapped;
	do {
		swapped = false;
		for( var index = 0; index < table_rows.length - 1; ++index ) {
			if( !sort_func( table_rows[ index ], table_rows[ index + 1 ] ) ) {
				// Swap unsorted elements
				var row1 = table_rows[ index ];
				var row2 = table_rows[ index + 1 ];
				row1.parentElement.insertBefore( row2, row1 );
				swapped = true;
			}
		}
	} while( swapped );
}

// Check if a row contains spoilers
function hasSpoiler( row ) {
	const INDEX_CHAR1 = 3;
	const INDEX_CHAR2 = 4;
	const SPOILER_NAME = "Machina Fiora";
	var elements = row.getElementsByTagName( "td" );
	return elements[ INDEX_CHAR1 ].textContent === SPOILER_NAME || elements[ INDEX_CHAR2 ].textContent === SPOILER_NAME;
}

/**************
 * INITIALIZE *
 **************/
// Check local storage
if( !storage_enabled ) {
	console.log( "Web storage is disabled, unable to store data between sessions" );
} else {
	if( !localStorage.getItem( "h2h" ) ) {
		save_data = [];
	} else {
		save_data = JSON.parse( localStorage.getItem( "h2h" ) );
	}
}

// Initial sort
sortTable( h2h_rows, function( row1, row2 ) {
	const cut_size = "h2h-".length;
	var num_1 = parseInt( row1.id.slice( cut_size ) );
	var num_2 = parseInt( row2.id.slice( cut_size ) );
	return num_1 < num_2;
} );

// Initialize rows
for( var index = 0; index < h2h_rows.length; ++index ) {
	const INDEX_CHECK = 0;

	// Spoiler tags
	if( hasSpoiler( h2h_rows[ index ] ) ) {
		h2h_rows[ index ].classList.add( "spoiler" ); // add spoilers
	}

	// Init rows from storage
	var elements = h2h_rows[ index ].getElementsByTagName( "td" );
	var checkbox = elements[ INDEX_CHECK ].getElementsByTagName( "input" )[ 0 ];

	if( storage_enabled ) {
		checkbox.checked = save_data[ index ];
	}
	
	if( checkbox.checked ) {
		h2h_rows[ index ].classList.add( "row-complete" ); // Color the row if needed
	} else {
		h2h_rows[ index ].classList.remove( "row-complete" );
	}
}
