var koa = require('koa');
var http = require('http');

var levee = require('levee');
var request = require('request');

var config = require('./config');

var app = koa();

var circuitBreakerOptions = {
	maxFailures: 5,
	timeout: 300,
	resetTimeout: 3000
};

var userApiPool = new http.Agent();
var productApiPool = new http.Agent();

function createClient(connectionPool, url) {
	var circuit = levee.createBreaker(request.get, circuitBreakerOptions);

	return new Promise(function(resolve, reject) {
		circuit.run({
			agent: connectionPool, 
			url: url
		}, function(err, data, body) {
			if (err) return reject(err);

			resolve(JSON.parse(body));
		});
	});
}

app.use(function* (next) {
	var start = new Date();
        console.log('Request', this.method, this.path, start);
	yield next;
	console.log('Request processed in', (new Date()).getTime() - start.getTime(), 'ms');
});

app.use(function* () {
	this.body = yield {
		users: createClient(userApiPool, 'http://localhost:81/users'),
		products: createClient(productApiPool, 'http://localhost:82/products')
	};
});

app.listen(config.port, function(err) {
        if (err) throw err;

        console.log('Server is listening on port', config.port);
});

