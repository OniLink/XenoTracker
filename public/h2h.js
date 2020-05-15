var h2h_rows = document.getElementsByClassName( "h2h-row" );

function onH2HMarkerChange( checkbox ) {
	var row = checkbox.parentElement.parentElement;
	if( checkbox.checked ) {
		row.classList.add( "row-complete" );
	} else {
		row.classList.remove( "row-complete" );
	}
}

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

// Initial sort
sortTable( h2h_rows, function( row1, row2 ) {
	var cut_size = "h2h-".length;
	var num_1 = parseInt( row1.id.slice( cut_size ) );
	var num_2 = parseInt( row2.id.slice( cut_size ) );
	return num_1 < num_2;
} );

// Add spoiler tags
function hasSpoiler( row ) {
	const INDEX_CHAR1 = 3;
	const INDEX_CHAR2 = 4;
	const SPOILER_NAME = "Machina Fiora";
	var elements = row.getElementsByTagName( "td" );
	return elements[ INDEX_CHAR1 ].textContent === SPOILER_NAME || elements[ INDEX_CHAR2 ].textContent === SPOILER_NAME;
}

for( index in h2h_rows ) {
	if( hasSpoiler( h2h_rows[ index ] ) ) {
		h2h_rows[ index ].classList.add( "spoiler" );
	}
}
