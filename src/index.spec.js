var http = require('http');
var nock = require('nock');
var supertest = require('supertest');

var app = http.createServer(require('./').callback());

describe('The Main API', function(){
	it ('responds with the correct body and status code', function(done){
		supertest(app)
			.get('/')
			.expect(200)
			.end(function(err, response){
				console.log(response.body);
				done(err);
			});
	});
});
