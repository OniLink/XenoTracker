function loadJSON( filename, finish_callback ) {
	// Open the JSON file with an HTTP request
	var http = new XMLHttpRequest();
	http.open( "GET", filename );
	http.onload = finish_callback;
	http.send( null );
}

function parseQuestDB( response ) {
	console.log( "Response received" );
}

// Load the quest database
loadJSON( "quests.json", parseQuestDB );
