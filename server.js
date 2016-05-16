// server.js

// Set up
var 	express			=	require('express'),				// Express framework
		app 			= 	express(),						// Procurement application w/ express
		https			= 	require('https'),				// HTTPS for secure connection
		fs 				=	require('fs'),					// File stream
		mongoose		=	require('mongoose'),			// MongoDB connection
		morgan  		=	require('morgan'),				// Log every request to console
	    bodyParser		=	require('body-parser');			// Pull information from HTML POST
		methodOverride	=	require('method-override');		// Suimulatte DELETE and PUT
		// cookieParser	=	require('cookie-parser'),		// For cookies
		// session 		=	require('express-session'),		// Session middleware?
		// Request 		=	require('./app/models/request');	// Request model

// Configuration
mongoose.connect('mongodb://localhost/procurement');

// app.use(session({
// 	secret: 'Procurement'
// }));
app.use(express.static(__dirname + '/public')); 					// Set the static files location (public)
app.use(morgan('dev'));												// Log every request to console
app.use(bodyParser.urlencoded({'extended' : 'true'}));				// Parse application/x-www-form-urlencoded
app.use(bodyParser.json());											// Parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));		// Parse application/vnd.api+json as json
app.use(methodOverride());
// app.use(cookieParser());

// var sslOptions = {
// 	pfx 			: 	fs.readFileSync('./app/certs/Procurement.pfx');
// 	passphrase		: 	"Aa123456"
// }

// Routs
require('./app/api/software.js')(app);
require('./app/api/unit.js')(app);
require('./app/api/purchase.js')(app);


// Initialize
// var secureServer = https.createServer(app).listen('443', function(){ // without sslOptions
// 	console.log('Procurement Server in listening on port 443')
// });

app.listen(8080)