'use strict';

const bluebird = require('bluebird');
const redis = require('redis');
bluebird.promisifyAll(redis.RedisClient.prototype);

const client = redis.createClient(process.env.REDISTOGO_URL);

if (process.env.NODE_ENV === 'test') {
  client.select(1);
}

client.on('error', (err) => console.log(`Error ${err}`));

module.exports = client;
