// Mapping arrays
const GENRES = [
	"Normal",
	"Story",
	"??? 2",
	"Timed"
];

const MAPS = [
	"N/A",
	"Colony 9",         // 1
	"Tephra Cave",      // 2
	"Bionis' Leg",      // 3
	"Colony 6",         // 4
	"Satorl Marsh",     // 5
	"Makna Forest",     // 6
	"Frontier Village", // 7
	"N/A",              // 8
	"N/A",              // 9
	"Eryth Sea",        // 10
	"Alcamoth",         // 11
	"Prison Island",    // 12
	"Valak Mountain",   // 13
	"Sword Valley",     // 14
	"Galahad Fortress", // 15
	"Fallen Arm",       // 16
	"Mechonis Field",   // 17
	"N/A",              // 18
	"Agniratha",        // 19
	"Central Factory"   // 20
];

const REGIONS = [
	"N/A",
	"Colony 9",       // 1
	"Colony 6",       // 2
	"Central Bionis", // 3
	"Upper Bionis",   // 4
	"Mechonis"        // 5
];

// Easy-access globals
var quest_db = null
var quest_table = null

function loadQuestDB( filename ) {
	// Open the JSON file with an HTTP request
	var http = new XMLHttpRequest();
	http.open( "GET", filename );
	http.overrideMimeType( "application/json" );
	http.onload = function() {
		quest_db = JSON.parse( http.responseText );

		// Parse the DB
		parseQuestDB( quest_db );
	};
	http.send( null );
}

function parseQuestDB( quests ) {
	var quest_section = document.getElementById( "quest-table" );
	quest_table = document.createElement( "table" );
	quest_section.appendChild( quest_table );

	parseQuestDBCreateTableHeader( quest_table );
	parseQuestDBCreateTableBody( quest_table, quests );
}

function parseQuestDBCreateTableHeader( table ) {
	var table_head = document.createElement( "thead" );
	table.appendChild( table_head );
	var table_head_row = document.createElement( "tr" );
	table_head.appendChild( table_head_row );

	// Quest Number
	var new_element = document.createElement( "th" );
	new_element.textContent = "#";
	table_head_row.appendChild( new_element );

	// Quest Name
	new_element = document.createElement( "th" );
	new_element.textContent = "Quest Name";
	table_head_row.appendChild( new_element );

	// Quest Genre
	new_element = document.createElement( "th" );
	new_element.textContent = "Type";
	table_head_row.appendChild( new_element );

	/// @todo Quest Giver

	// Area
	new_element = document.createElement( "th" );
	new_element.textContent = "Area";
	table_head_row.appendChild( new_element );

	/// @todo Story Progress

	// Prereq quests
	new_element = document.createElement( "th" );
	new_element.textContent = "Prerequisite Quest";
	table_head_row.appendChild( new_element );

	// Fame region
	new_element = document.createElement( "th" );
	new_element.textContent = "Fame Region";
	table_head_row.appendChild( new_element );

	// Fame requirement
	new_element = document.createElement( "th" );
	new_element.textContent = "Fame Requirement";
	table_head_row.appendChild( new_element );

	/// @todo NPC Meet 1 + 2
	/// @todo Affinity Link + Status
}

function parseQuestDBCreateTableBody( table, quests ) {
	var table_body = document.createElement( "tbody" );
	table.appendChild( table_body );

	for( quest_index in quests ) {
		var quest_row = document.createElement( "tr" );
		table_body.appendChild( quest_row );

		// Quest Number
		var new_element = document.createElement( "td" );
		new_element.className += " right";
		new_element.textContent = String( parseInt( quest_index ) + 1 ); // Why JS why
		quest_row.appendChild( new_element );

		// Quest Name
		new_element = document.createElement( "td" );
		new_element.textContent = quests[ quest_index ].title;
		quest_row.appendChild( new_element );

		// Quest Genre
		new_element = document.createElement( "td" );
		new_element.textContent = GENRES[ parseInt( quests[ quest_index ].genre_id ) ];
		quest_row.appendChild( new_element );

		/// @todo Quest Giver

		// Area
		new_element = document.createElement( "td" );
		new_element.textContent = MAPS[ parseInt( quests[ quest_index ].map_id ) ];
		quest_row.appendChild( new_element );

		/// @todo Story Progress

		// Prereq quests
		new_element = document.createElement( "td" );
		if( parseInt( quests[ quest_index ].quest_req_id ) == 0 ) {
			new_element.textContent = "N/A";
		} else {
			var found_prereq_quest = quests.find( element => parseInt( element.internal_id ) == parseInt( quests[ quest_index ].quest_req_id ) );
			new_element.textContent = found_prereq_quest.title;
		}
		quest_row.appendChild( new_element );

		// Fame region
		new_element = document.createElement( "td" );
		new_element.textContent = REGIONS[ parseInt( quests[ quest_index ].quest_fame_region_id ) ];
		quest_row.appendChild( new_element );

		// Fame requirement
		new_element = document.createElement( "td" );
		if( parseInt( quests[ quest_index ].quest_fame_region_id ) == 0 ) {
			new_element.textContent = "N/A";
		} else {
			new_element.textContent = String( parseInt( quests[ quest_index ].quest_fame_req ) / 2000.0 + 1.0 ) + " star(s)";
		}
		quest_row.appendChild( new_element );

		/// @todo NPC Meet 1 + 2
		/// @todo Affinity Link + Status
	}
}

// Load the quest database
loadQuestDB( "quests.json" );
