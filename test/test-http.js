'use strict';

var http = require('http');
var agent = require('../');
var tape = require('tape');
var server = require('./server.js');
var s = server.createServer();

s.on('/', function (req, res) {
	res.end('ok');
});

tape('setup', function (t) {
	s.listen(s.port, function () {
		t.end();
	});
});

tape('should make request with new http agent', function (t) {
	http.get({
		host: s.host,
		port: s.port,
		agent: agent.http.globalAgent
	}, function (res) {
		res
			.once('data', function (data) {
				t.equal(data.toString(), 'ok');
				t.end();
			})
			.on('error', t.error);
	});
});

tape('cleanup', function (t) {
	s.close();
	t.end();
});
