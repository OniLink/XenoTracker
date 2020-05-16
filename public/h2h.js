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
function sortTable( table_rows, sort_func ) {
	var parent = table_rows[ 0 ].parentElement;
	var arrayed_elements = [].slice.call( table_rows ); // Workaround to convert the table to an array
	arrayed_elements.sort( sort_func ); // Sort
	arrayed_elements.forEach( element => parent.appendChild( element ) ); // And put the elements back in
	// Since appendChild removes the element from its previous parent, the old ordering is erased automatically
}

// Check if a row contains spoilers
function hasSpoiler( row ) {
	const INDEX_CHAR1 = 3;
	const INDEX_CHAR2 = 4;
	const SPOILER_NAME = "Machina Fiora";
	var elements = row.getElementsByTagName( "td" );
	return elements[ INDEX_CHAR1 ].textContent === SPOILER_NAME || elements[ INDEX_CHAR2 ].textContent === SPOILER_NAME;
}

/******************
 * SORT FUNCTIONS *
 ******************/
function sortByNum() {
	sortTable( h2h_rows, function( row1, row2 ) {
		const INDEX_NUM = 1;
		var num_1 = parseInt( row1.getElementsByTagName( "td" )[ INDEX_NUM ].textContent );
		var num_2 = parseInt( row2.getElementsByTagName( "td" )[ INDEX_NUM ].textContent );
		return num_1 > num_2;
	} );
}

function sortByTitle() {
	sortTable( h2h_rows, function( row1, row2 ) {
		const INDEX_TITLE = 2;
		var title_1 = row1.getElementsByTagName( "td" )[ INDEX_TITLE ].textContent;
		var title_2 = row2.getElementsByTagName( "td" )[ INDEX_TITLE ].textContent;
		return title_1 > title_2;
	} );
}

function sortByCharacters() {
	sortTable( h2h_rows, function( row1, row2 ) {
		const CHARS = [
			"Shulk",
			"Reyn",
			"Fiora",
			"Dunban",
			"Sharla",
			"Riki",
			"Melia",
			"Machina Fiora"
		];

		const INDEX_CHAR1 = 3;
		const INDEX_CHAR2 = 4;

		var char1a = row1.getElementsByTagName( "td" )[ INDEX_CHAR1 ].textContent;
		var char1b = row1.getElementsByTagName( "td" )[ INDEX_CHAR2 ].textContent;
		var char2a = row2.getElementsByTagName( "td" )[ INDEX_CHAR1 ].textContent;
		var char2b = row2.getElementsByTagName( "td" )[ INDEX_CHAR2 ].textContent;

		char1a = CHARS.indexOf( char1a );
		char1b = CHARS.indexOf( char1b );
		char2a = CHARS.indexOf( char2a );
		char2b = CHARS.indexOf( char2b );

		// Prioritize the primary, then the secondary
		return char1a > char2a || ( char1a == char2a && char1b > char2b );
	} );
}

function sortByAffinity() {
	sortTable( h2h_rows, function( row1, row2 ) {
		const AFFINITY = [
			"Yellow",
			"Green",
			"Blue",
			"White",
			"Pink"
		];

		const INDEX_AFFINITY = 5;

		var aff1 = row1.getElementsByTagName( "td" )[ INDEX_AFFINITY ].textContent;
		var aff2 = row2.getElementsByTagName( "td" )[ INDEX_AFFINITY ].textContent;

		aff1 = AFFINITY.indexOf( aff1 );
		aff2 = AFFINITY.indexOf( aff2 );

		return aff1 > aff2;
	} );
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
sortByNum();

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
