var levee = require('levee');
var request = require('request');

request.get('http://localhost:81/users', function(err, data) {
	console.log(err || data.body);
});
