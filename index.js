var levee = require('levee');
var request = require('request');

var circuitBreakerOptions = {
	maxFailures: 5,
	timeout: 300,
	resetTimeout: 3000
};

var circuit = levee.createBreaker(request.get, circuitBreakerOptions);

function makeRequest() {
	circuit.run('http://localhost:81/users', function(err, data, body) {
		if (err) return console.error(err);

		console.log(body);
	});
}

setInterval(makeRequest, 1000);
