# infinity-agent [![Build Status](https://travis-ci.org/floatdrop/infinity-agent.svg?branch=master)](https://travis-ci.org/floatdrop/infinity-agent)

Node-core HTTP Agent for userland.

## Usage

```js
var infinityAgent = require('infinity-agent');

var http = require('http');
var https = require('https');

http.get('http://google.com', {agent: infinityAgent.http.globalAgent});
https.get('http://google.com', {agent: infinityAgent.https.globalAgent});
```

This package is a mirror of the Agent class in Node-core.

There is one minor change in [addRequest](https://github.com/floatdrop/infinity-agent/blob/master/http.js#L135-L140) method: basicly we disable keepAlive if agent is not configured for it and `maxSockets` is set to `Infinity`.

## License

MIT © [Vsevolod Strukchinsky](floatdrop@gmail.com)
