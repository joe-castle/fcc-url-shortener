# FCC URL Shortener Project

[![Greenkeeper badge](https://badges.greenkeeper.io/joesmith100/fcc-url-shortener.svg)](https://greenkeeper.io/)

Please see challenge page for more info: http://www.freecodecamp.com/challenges/url-shortener-microservice

_Uses redis to persist the shortened urls.
You can install redis with homebrew._
```
> brew install redis
> redis-server
```
The app is configured to work with the default ip and ports so once redis-server is up, it will automatically work.
```
> npm install
> node src/server.js
```

Example Creation Usage:
```
https://fccurl.herokuapp.com/new/http://www.google.com
https://fccurl.herokuapp.com/new/www.freecodecamp.com
```

You can pass `?allow=true` to force the creation of a url, otherwise it is subject to validation.
```
https://fccurl.herokuapp.com/fakeurl?allow=true
```

Example Creation Output:
```
{original_url: "http://www.google.com", short_url: "https://fccurl.herokuapp.com/0"}
{original_url: "http://www.freecodecamp.com", short_url: "https://fccurl.herokuapp.com/1"}
{original_url: "fakeurl", short_url: "https://fccurl.herokuapp.com/2"}
```
Usage:
```
https://fccurl.herokuapp.com/3
```
Will re-direct to:
```
https://en.wikipedia.org/wiki/Computer_programming
```
