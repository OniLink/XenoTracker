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
var quest_rows = [];
var quest_subrows = [];

// Helper Functions
function addTableElement( row, type, value ) {
	var element = document.createElement( type );
	element.textContent = value;
	row.appendChild( element );
	return element;
}

// Loader Functions
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
	var head = document.createElement( "thead" );
	table.appendChild( head );
	var row = document.createElement( "tr" );
	head.appendChild( row );

	// Add headers
	addTableElement( row, "th", "" ).classList.add( "hidden-cell" ); // Empty spot for the check box
	addTableElement( row, "th", "#" );                               // Quest number
	addTableElement( row, "th", "Title" );                           // Quest title
//	addTableElement( row, "th", "Type" );                         // Genre
	addTableElement( row, "th", "Client" );                          // Client
	addTableElement( row, "th", "Area" );                            // Area
//	addTableElement( row, "th", "Story Progress" ).colSpan = 2;   // Story Progress
//	addTableElement( row, "th", "Prerequisite Quest" );           // Quest prereq
//	addTableElement( row, "th", "Fame Requirement" ).colSpan = 2; // Fame requirement
//	addTableElement( row, "th", "Meet NPCs" ).colSpan = 2;        // NPC Meet
//	addTableElement( row, "th", "Affinity Link" ).colSpan = 3;    // Affinity Link
}

function parseQuestDBCreateTableBody( table, quests ) {
	var table_body = document.createElement( "tbody" );
	table.appendChild( table_body );

	for( quest_index in quests ) {
		var row = document.createElement( "tr" );
		table_body.appendChild( row );

		addQuestHeadData( row, quest_index, quests );
		quest_rows.push( row );

		// Compute data
		/*
		var genre = GENRES[ parseInt( quests[ quest_index ].genre_id ) ];

		var story_ch = "N/A";
		var story_beat = "N/A";
		if( quests[ quest_index ].story_flag > 0 ) {
			story_ch = "Chapter " + quests[ quest_index ].story_ch;
			story_beat = quests[ quest_index ].story_beat;
		}

		var prereq_quest_title = "N/A";
		if( parseInt( quests[ quest_index ].quest_req_id ) > 0 ) {
			prereq_quest_title = quests.find( element => parseInt( element.internal_id ) == parseInt( quests[ quest_index ].quest_req_id ) ).title;
		}

		var fame_region = REGIONS[ parseInt( quests[ quest_index ].quest_fame_region_id ) ];
		var fame_stars = "N/A";
		if( parseInt( quests[ quest_index ].quest_fame_region_id ) > 0 ) {
			var stars = parseInt( quests[ quest_index ].quest_fame_req ) / 2000.0 + 1.0;
			fame_stars = String( stars ) + " star";
			if( stars != 1.0 ) {
				fame_stars += "s";
			}
		}

		var npc_meet1 = "N/A";
		if( quests[ quest_index ].npc_meet1 ) {
			npc_meet1 = quests[ quest_index ].npc_meet1;
		}

		var npc_meet2 = "N/A";
		if( quests[ quest_index ].npc_meet2 ) {
			npc_meet2 = quests[ quest_index ].npc_meet2;
		}

		var ac_link_char1 = "N/A";
		var ac_link_char2 = "N/A";
		var ac_link_status = "N/A";
		if( quests[ quest_index ].ac_link_id ) {
			ac_link_char1 = quests[ quest_index ].ac_link_char1;
			ac_link_char2 = quests[ quest_index ].ac_link_char2;
			ac_link_status = quests[ quest_index ].ac_link_status;
		}

		// Add columns
		addTableElement( row, "td", genre );                     // Genre
		addTableElement( row, "td", story_ch );                  // Story chapter
		addTableElement( row, "td", story_beat );                // Story beat
		addTableElement( row, "td", prereq_quest_title );        // Prereq quest
		addTableElement( row, "td", fame_region );               // Fame region
		addTableElement( row, "td", fame_stars );                // Fame stars
		addTableElement( row, "td", npc_meet1 );                 // NPC Meet #1
		addTableElement( row, "td", npc_meet2 );                 // NPC Meet #2
		addTableElement( row, "td", ac_link_char1 );             // ALink NPC #1
		addTableElement( row, "td", ac_link_char2 );             // ALink NPC #2
		addTableElement( row, "td", ac_link_status );            // ALink Status
		*/
	}
}

function addQuestHeadData( row, index, quests ) {
	var num = String( parseInt( index ) + 1 ); // what is wrong with Javascript
	var title = quests[ index ].title;
	var client = quests[ index ].client;
	var area = MAPS[ quests[ index ].map_id ];

	// Add the columns
	addTableElement( row, "td", num ).className += " right";
	addTableElement( row, "td", title );
	addTableElement( row, "td", client );
	addTableElement( row, "td", area );
}

// Load the quest database
loadQuestDB( "quests.json" );
