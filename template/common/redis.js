'use strict';
const Redis = require('ioredis');
const config = require('../config/');
const log = require('../common/log');
{{#if redis-cluster}}
let redisClient = new Redis(config.redis);
{{else}}
let redisClient = new Redis.Cluster(config.redisNodes);
{{/if}}
redisClient.on('error', function (err) {
    log.error('Redis connect error',config.redis.host+':'+config.redis.port);
    log.error(err);
});
redisClient.on('connect', function () {
    log.info('Redis connect succeed',config.redis.host+':'+config.redis.port);
});
module.exports = redisClient;