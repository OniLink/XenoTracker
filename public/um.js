/***********
 * GLOBALS *
 ***********/
var um_rows = document.getElementsByClassName( "um-container" );
var save_data = null;
var storage_enabled = typeof( Storage ) !== "undefined";

/*************
 * CALLBACKS *
 *************/
function onUMMarkerChange( checkbox, index ) {
	var row = checkbox.parentElement.parentElement;
	index = index - 1; // Switch from 1-index to 0-index
	if( checkbox.checked ) {
		row.classList.add( "row-complete" );
		if( storage_enabled ) {
			save_data[ index ] = true;
			localStorage.setItem( "um", JSON.stringify( save_data ) );
		}
	} else {
		row.classList.remove( "row-complete" );
		if( storage_enabled ) {
			save_data[ index ] = false;
			localStorage.setItem( "um", JSON.stringify( save_data ) );
		}
	}
}

function onClearUMs() {
	const INDEX_CHECK = 0;

	for( var index = 0; index < um_rows.length; ++index ) {
		var checkbox = getUMColumn( um_rows[ index ], INDEX_CHECK ).getElementsByTagName( "input" )[ 0 ];
		checkbox.checked = false;
		onUMMarkerChange( checkbox, index + 1 ); // Add 1 because it takes quest number, not index, blame Handlebars
	}
}

function onCollapseClickInternal( index ) {
	var row = document.getElementById( "um-" + String( index ) ); // get the table row

	// Hide/show the subrow
	var subrow = getUMSubrow( row ); // get the subrow
	subrow.classList.toggle( "hidden" ); // hide or show it
}

function onCollapseClick( button, index ) {
	button.classList.toggle( "collapse" ); // swap the button icon

	onCollapseClickInternal( index );
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

function getUMMainRow( um_div ) {
	return um_div.getElementsByClassName( "um-row" )[ 0 ];
}

function getUMSubrow( um_div ) {
	return um_div.getElementsByClassName( "um-subrow" )[ 0 ];
}

function getUMColumn( um_div, column ) {
	return getUMMainRow( um_div ).getElementsByTagName( "td" )[ column ];
}

/******************
 * SORT FUNCTIONS *
 ******************/
function sortByNum() {
	sortTable( um_rows, function( row1, row2 ) {
		const INDEX_NUM = 1;
		var num_1 = parseInt( row1.getElementsByTagName( "td" )[ INDEX_NUM ].textContent );
		var num_2 = parseInt( row2.getElementsByTagName( "td" )[ INDEX_NUM ].textContent );
		return num_1 > num_2;
	} );
}

function sortByName() {
	sortTable( um_rows, function( row1, row2 ) {
		const INDEX_NAME = 2;
		var title_1 = row1.getElementsByTagName( "td" )[ INDEX_NAME ].textContent;
		var title_2 = row2.getElementsByTagName( "td" )[ INDEX_NAME ].textContent;
		return title_1 > title_2;
	} );
}

function sortByLevel() {
	sortTable( um_rows, function( row1, row2 ) {
		const INDEX_LEVEL = 3;
		var level_1 = row1.getElementsByTagName( "td" )[ INDEX_LEVEL ].textContent;
		var level_2 = row1.getElementsByTagName( "td" )[ INDEX_LEVEL ].textContent;
		return level_1 > level_2;
	} );
}

function sortByArea() {
	sortTable( um_rows, function( row1, row2 ) {
		const AREAS = [
			"Colony 9",
			"Tephra Cave",
			"Bionis' Leg",
			"Colony 6",
			"Ether Mine",
			"Satorl Marsh",
			"Makna Forest",
			"Frontier Village",
			"Eryth Sea",
			"High Entia Tomb",
			"Valak Mountain",
			"Sword Valley",
			"Galahad Fortress",
			"Fallen Arm",
			"Mechonis Field",
			"Central Factory",
			"Agniratha",
			"Bionis' Interior",
			"Prison Island"
		];

		const INDEX_AREA = 4;

		var area1 = row1.getElementsByTagName( "td" )[ INDEX_AREA ].textContent;
		var area2 = row2.getElementsByTagName( "td" )[ INDEX_AREA ].textContent;

		area1 = AREAS.indexOf( area1 );
		area2 = AREAS.indexOf( area2 );

		return area1 > area2;
	} );
}

/**************
 * INITIALIZE *
 **************/
// Check local storage
if( !storage_enabled ) {
	console.log( "Web storage is disabled, unable to store data between sessions" );
} else {
	if( !localStorage.getItem( "um" ) ) {
		save_data = [];
	} else {
		save_data = JSON.parse( localStorage.getItem( "um" ) );
	}
}

// Initialize rows
for( var index = 0; index < um_rows.length; ++index ) {
	const INDEX_CHECK = 0;

	// Init rows from storage
	var elements = um_rows[ index ].getElementsByTagName( "td" );
	var checkbox = elements[ INDEX_CHECK ].getElementsByTagName( "input" )[ 0 ];

	if( storage_enabled ) {
		checkbox.checked = save_data[ index ];
		onUMMarkerChange( checkbox, index + 1 );
	}

	// Collapse everything
	onCollapseClickInternal( index + 1 );
}
