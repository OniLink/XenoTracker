var quest_rows = document.getElementsByClassName( "quest-row" );

function onQuestMarkerChange( checkbox ) {
	var row = checkbox.parentElement.parentElement;
	if( checkbox.checked ) {
		row.classList.add( "row-complete" );
	} else {
		row.classList.remove( "row-complete" );
	}
}
