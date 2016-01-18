# FCC URL Shortener Project

Please see challenge page for more info: http://www.freecodecamp.com/challenges/url-shortener-microservice

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
