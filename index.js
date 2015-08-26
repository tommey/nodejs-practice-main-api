var levee = require('levee');
var request = require('request');

var circuitBreakerOptions = {
	maxFailures: 5,
	timeout: 300,
	resetTimeout: 30000
};

var circuit = levee.createBreaker(request.get, circuitBreakerOptions);

circuit.run('http://localhost:81/users', function(err, data, body) {
	if (err) return console.error(err);

	console.log(body);
});
