/* global it */

'use strict';

var agent = require('./index');
var assert = require('assert');

var http = require('http');
var https = require('https');

it('http.Agent.defaultMaxSockets should be Infinity', function () {
	assert.equal(agent.http.Agent.defaultMaxSockets, Infinity);
});

it('should make request with new http agent', function (done) {
	http.get({host: 'www.google.com', agent: agent.http.globalAgent}, function (res) {
		res
			.once('data', function () {
				done();
			})
			.on('error', done);
	});
});

it('should make request with new https agent', function (done) {
	https.get({protocol: 'https:', host: 'www.google.com', agent: agent.https.globalAgent}, function (res) {
		res
			.once('data', function () {
				done();
			})
			.on('error', done);
	});
});
