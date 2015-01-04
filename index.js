'use strict';

var http = require('http');
var https = require('https');
var url = require('url');

function agent(options) {
	// if defaultMaxSockets is Infinity - then we should use default agent
	if (http.Agent.defaultMaxSockets === Infinity) {
		return undefined;
	}

	if (!options) { throw new Error('options is required'); }

	if (typeof options === 'string') {
		options = url.parse(options);
	}

	var proto = options.protocol === 'https:' ? https : http;

	if (proto === http) {
		return agent.httpAgent;
	}

	if (typeof options.ca === 'undefined' &&
		typeof options.cert === 'undefined' &&
		typeof options.ciphers === 'undefined' &&
		typeof options.key === 'undefined' &&
		typeof options.passphrase === 'undefined' &&
		typeof options.pfx === 'undefined' &&
		typeof options.rejectUnauthorized === 'undefined') {
		return agent.httpsAgent;
	}

	options.maxSockets = options.maxSockets || Infinity;

	return new https.Agent(options);
}

agent.httpAgent = new http.Agent({maxSockets: Infinity});
agent.httpsAgent = new https.Agent({maxSockets: Infinity});

module.exports = agent;
