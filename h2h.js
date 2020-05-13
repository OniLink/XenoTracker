// Mapping arrays
const CHARS = [
	"N/A",
	"Shulk",  // 1
	"Reyn",   // 2
	"Fiora",  // 3
	"Dunban", // 4
	"Sharla", // 5
	"Riki",   // 6
	"Melia",  // 7
	"Machina Fiora"
];

const MAPS = [
	"N/A",
	"",                 // 1
	"Colony 9",         // 2
	"Tephra Cave",      // 3
	"Bionis' Leg",      // 4
	"Colony 6",         // 5
	"Ether Mine",       // 6
	"Satorl Marsh",     // 7
	"Makna Forest",     // 8
	"Frontier Village", // 9
	"",                 // 10
	"High Entia Tomb",  // 11
	"Eryth Sea",        // 12
	"Alcamoth",         // 13
	"",                 // 14
	"Prison Island",    // 15
	"Valak Mountain",   // 16
	"",                 // 17
	"",                 // 18
	"Fallen Arm",       // 19
	"",                 // 20
	"",                 // 21
	"",                 // 22
	"",                 // 23
	"",                 // 24
	"Bionis' Interior"  // 25
];

const AFFINITY = [
	"Yellow",
	"Green",
	"Blue",
	"White",
	"Pink"
];

// Easy-access globals
var h2h_db = null
var h2h_table = null

function loadH2HDB( filename ) {
	// Open the JSON file with an HTTP request
	var http = new XMLHttpRequest();
	http.open( "GET", filename );
	http.overrideMimeType( "application/json" );
	http.onload = function() {
		h2h_db = JSON.parse( http.responseText );

		// Parse the DB
		parseH2HDB( h2h_db );
	};
	http.send( null );
}

function parseH2HDB( h2hs ) {
	var h2h_section = document.getElementById( "h2h-table" );
	h2h_table = document.createElement( "table" );
	h2h_section.appendChild( h2h_table );

	parseH2HDBCreateTableHeader( h2h_table );
	parseH2HDBCreateTableBody( h2h_table, h2hs );
}

function parseH2HDBCreateTableHeader( table ) {
	var table_head = document.createElement( "thead" );
	table.appendChild( table_head );
	var table_head_row = document.createElement( "tr" );
	table_head.appendChild( table_head_row );

	// H2H Number
	var new_element = document.createElement( "th" );
	new_element.textContent = "#";
	table_head_row.appendChild( new_element );

	// H2H Name
	new_element = document.createElement( "th" );
	new_element.textContent = "Title";
	table_head_row.appendChild( new_element );

	// First Character
	new_element = document.createElement( "th" );
	new_element.textContent = "Character 1";
	table_head_row.appendChild( new_element );
	
	// Second Character
	new_element = document.createElement( "th" );
	new_element.textContent = "Character 2";
	table_head_row.appendChild( new_element );
	
	// Affinity
	new_element = document.createElement( "th" );
	new_element.textContent = "Affinity";
	table_head_row.appendChild( new_element );
	
	/// @todo Time
	
	// Story Beat
	new_element = document.createElement( "th" );
	new_element.textContent = "Story Chapter";
	table_head_row.appendChild( new_element );

	new_element = document.createElement( "th" );
	new_element.textContent = "Story Progress";
	table_head_row.appendChild( new_element );

	// Map
	new_element = document.createElement( "th" );
	new_element.textContent = "Map";
	table_head_row.appendChild( new_element );
}

function parseH2HDBCreateTableBody( table, h2hs ) {
	var table_body = document.createElement( "tbody" );
	table.appendChild( table_body );

	for( index in h2hs ) {
		var new_row = document.createElement( "tr" );
		table_body.appendChild( new_row );

		// H2H Number
		var new_element = document.createElement( "td" );
		new_element.className += " right";
		new_element.textContent = h2hs[ index ].sort_id; // Use the Sort ID, we gotta sort at the end
		new_row.appendChild( new_element );

		// Title
		new_element = document.createElement( "td" );
		new_element.textContent = h2hs[ index ].title;
		new_row.appendChild( new_element );

		// First Character
		new_element = document.createElement( "td" );
		new_element.textContent = CHARS[ parseInt( h2hs[ index ].first_char_id ) ];
		new_row.appendChild( new_element );
		
		// Second Character
		new_element = document.createElement( "td" );
		new_element.textContent = CHARS[ parseInt( h2hs[ index ].second_char_id ) ];
		new_row.appendChild( new_element );
		
		// Affinity
		new_element = document.createElement( "td" );
		var affinity = Math.floor( parseInt( h2hs[ index ].affinity ) / 1000.0 );
		if( affinity >= 4 ) {
			affinity = 4;
		}
		new_element.textContent = AFFINITY[ affinity ];
		new_row.appendChild( new_element );
		
		/// @todo Time
		
		// Story Beat
		new_element = document.createElement( "td" );
		if( h2hs[ index ].story_flag > 0 ) {
			new_element.textContent = h2hs[ index ].story_ch;
		} else {
			new_element.textContent = "N/A";
		}
		new_row.appendChild( new_element );

		new_element = document.createElement( "td" );
		if( h2hs[ index ].story_flag > 0 ) {
			new_element.textContent = h2hs[ index ].story_beat;
		} else {
			new_element.textContent = "N/A";
		}
		new_row.appendChild( new_element );
		
		// Map
		new_element = document.createElement( "td" );
		new_element.textContent = MAPS[ parseInt( h2hs[ index ].map_id ) ];
		new_row.appendChild( new_element );

		// Add spoiler tag if necessary
		if( parseInt( h2hs[ index ].first_char_id ) == 8 || parseInt( h2hs[ index ].second_char_id ) == 8 ) {
			new_row.className += " spoiler";
		}
	}
}

// Load the quest database
loadH2HDB( "h2h.json" );
