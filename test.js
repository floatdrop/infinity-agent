/* global it */

'use strict';

var agent = require('./index');
var assert = require('assert');

it('should return agent.httpAgent for HTTP requests', function () {
	assert.equal(agent.httpAgent, agent('http://google.com'));
});

it('should return agent.httpAgent for HTTPS requests', function () {
	assert.equal(agent.httpsAgent, agent('https://google.com'));
});

it('should return undefined, if default maxSockets is Infinity', function () {
	require('http').Agent.defaultMaxSockets = Infinity;
	assert.equal(undefined, agent('https://google.com'));
	require('http').Agent.defaultMaxSockets = 5;
});

it('should return new agent, if tls options present', function () {
	var a = agent({protocol: 'https:', ca: 'wat'});
	assert.notEqual(agent.httpsAgent, a);
	assert.equal(a.maxSockets, Infinity);
});
