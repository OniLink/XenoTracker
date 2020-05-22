const PORT = 3000;

var fs = require( 'fs' );

var express = require( 'express' );

var app = express();
var handlebars = require( 'express-handlebars' ).create( { defaultLayout: 'main' } );

app.engine( 'handlebars', handlebars.engine );
app.set( 'view engine', 'handlebars' );
app.set( 'port', PORT );

app.use( express.static( 'public' ) ); // Search directory for public files

var quest_db = JSON.parse( fs.readFileSync( 'public/quests.json' ) );
var h2h_db = JSON.parse( fs.readFileSync( 'public/h2h.json' ) );
var um_db = JSON.parse( fs.readFileSync( 'public/ums.json' ) );

app.get( '/', function( req, res ) {
	res.render( 'index' );
} );

app.get( '/quests', function( req, res ) {
	res.render( 'quests', { quests : quest_db } );
} );

app.get( '/h2h', function( req, res ) {
	res.render( 'h2h', { h2hs : h2h_db } );
} );

app.get( '/um', function( req, res ) {
	res.render( 'um', { ums : um_db } );
} );

app.use( function( req, res ) {
	res.status( 404 ).render( '404' );
} );

app.listen( app.get( 'port' ), function() {
	console.log( 'Express started on port ' + app.get( 'port' ) + '; press Ctrl+C to exit.' );
} );
