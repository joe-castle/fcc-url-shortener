'use strict';

const redis = require('redis');

let client;

if (process.env.NODE_ENV === 'production') {
  client = redis.createClient(process.env.REDISTOGO_URL);
} else if (process.env.NODE_ENV === 'test') {
  client = redis.createClient();
  client.select(1);
} else {
  client = redis.createClient();
}

client.on('error', (err) => {
    console.log(`Error ${err}`);
});

module.exports = client;
