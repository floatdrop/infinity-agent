# infinity-agent [![Build Status](https://travis-ci.org/floatdrop/infinity-agent.svg?branch=master)](https://travis-ci.org/floatdrop/infinity-agent)

Returns HTTP/HTTPS agent with maxSockets set to Infinity (based on URL or options).

__Motivation__: Node 0.10.x is using 5 sockets limit on one host:port pair, but in 0.11.x this is fixed with defaultMaxSockets set to Infinity. To backport this behaviour you can use this module.

## Usage

```js
var agent = require('infinity-agent');
var http = require('http');
var https = require('https');

http.get('http://google.com', { agent: agent('http://google.com') });
https.get('http://google.com', { agent: agent('https://google.com') });
```

## API

### agent(options)

Returns instance of HTTP/HTTPS agent, based on `options`.

This what `agent` could return:

 * `undefined`, if http.Agent.defaultMaxSockets is not `5`
 * `agent.httpAgent`, if `options.protocol === 'http:'` (`agent.httpsAgent` otherwise)
 * New instance of HTTPS agent with `options`, if they contains any of [tls options](http://nodejs.org/api/tls.html#tls_tls_connect_options_callback)

#### options  
_Required_  
__Type__: `String` or `Object` from [url.parse](http://nodejs.org/docs/latest/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost)

## License

MIT © [Vsevolod Strukchinsky](floatdrop@gmail.com)
