var http = require('http');
var nock = require('nock');
var supertest = require('supertest');
var expect = require('chai').expect;

var app = http.createServer(require('./').callback());

describe('The Main API', function(){
	it ('responds with the correct body and status code', function(done){
		var users = [{name: 'John', age: 32}];
		var products = [{name: 'Thing', color: 'Red', price: 32}];
		var list = {users: users, products: products};
		
		nock('http://localhost:81').get('/users').reply(200, users);
		nock('http://localhost:82').get('/products').reply(200, products);

		supertest(app)
			.get('/')
			.expect(200)
			.end(function(err, response){
				expect(response.body).to.eql(list);
				done(err);
			});
	});
});
