'use strict';
var https = require('https');
var agent = require('../');
var tape = require('tape');
var pem = require('pem');
var server = require('./server.js');

var s;
var key;
var cert;
var caRootKey;
var caRootCert;

tape('root pem', function (t) {
	pem.createCertificate({
		days:1,
		selfSigned:true
	}, function (err, keys) {
		caRootKey = keys.serviceKey;
		caRootCert = keys.certificate;
		t.end();
	});
});

tape('pem', function (t) {
	pem.createCertificate({
		serviceCertificate: caRootCert,
		serviceKey: caRootKey,
		serial: Date.now(),
		days: 500,
		country: '',
		state: '',
		locality: '',
		organization: '',
		organizationUnit: '',
		commonName: 'sindresorhus.com'
	}, function (err, keys) {
		key = keys.clientKey;
		cert = keys.certificate;
		t.end();
	});
});

tape('setup', function (t) {
	s = server.createSSLServer(server.portSSL + 1, {
		key: key,
		cert: cert
	});

	s.on('/', function (req, res) {
		res.end('ok');
	});

	s.listen(s.port, function () {
		t.end();
	});
});

tape('should make request with new https agent', function (t) {
	https.get({
		host: s.host,
		port: s.port,
		agent: new agent.https.Agent({
			strictSSL: true,
			ca: caRootCert
		}),
		headers: {host: 'sindresorhus.com'}
	}, function (res) {
		res
			.on('error', t.error)
			.once('data', function (data) {
				t.equal(data.toString(), 'ok');
				t.end();
			});
	});
});

tape('cleanup', function (t) {
	s.close();
	t.end();
});
