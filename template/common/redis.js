'use strict';
const Redis = require('ioredis');
const config = require('../config/');
const log = require('../common/log');
{{#if redis-cluster}}
let redisClient = new Redis.Cluster(config.redisNodes);
{{else}}
let redisClient = new Redis(config.redis);
{{/if}}
{{#if redis-cluster}}
redisClient.on('error', function (err) {
    log.error('Redis connect error:'+config.redisNodes.toString());
    log.error(err);
});
redisClient.on('connect', function () {
    log.info('Redis connect succeed:'+config.redisNodes.toString());
});
{{else}}
redisClient.on('error', function (err) {
    log.error('Redis connect error:'+config.redis.host+':'+config.redis.port);
    log.error(err);
});
redisClient.on('connect', function () {
    log.info('Redis connect succeed:'+config.redis.host+':'+config.redis.port);
});
{{/if}}
module.exports = redisClient;