var app = require('./src');
var config = require('./config');

app.listen(config.port, function(err) {
	if (err) throw err;

	console.log('Server is listening on port', config.port);
});

