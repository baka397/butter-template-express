'use strict';
const crypto = require('crypto');
const pkg = require('../package.json');
const redisClient = require('../common/redis');
const config = require('../config/');
const log = require('../common/log');

let notConn = false;
let sessionIdKeyPrefix = pkg.name+'-';

function sign(val, secret) {
    return val + '.' + crypto
            .createHmac('sha256', secret)
            .update(val)
            .digest('base64')
            .replace(/[\/\+=]/g, '');
}

function generate(id) {
    let session = {};
    if (id) {
        session.id = id;
    } else {
        session.id = (new Date()).getTime() + Math.random().toString();
        session.id = sessionIdKeyPrefix + sign(session.id, config.session.secret);
    }
    return session;
}

function writeHead(req, res) {
    res.cookie(config.session.sessionKey, req.session.id,serialize(config.session));
}

function serialize(opt) {
    let options={};
    if(opt.maxAge) options.maxAge=opt.maxAge;
    if(opt.domain) options.domain=opt.domain;
    if(opt.path) options.path=opt.path;
    if(opt.httpOnly) options.httpOnly=opt.httpOnly;
    if(opt.secure) options.secure=opt.secure;
    return options;
}

exports.init = function (req, res, next) {
    let id = req.cookies[config.session.sessionKey];
    if (!id) {
        req.session = generate();
        next();
    } else if (notConn) {
        if (!req.session) {
            req.session = generate(id);
        }
        next();
    } else {
        redisClient.hget(id, 'session', function (err, reply) {
            if (err) {
                log.error(err);
            }
            if (reply) {
                let session = JSON.parse(reply);
                req.session = session;
                if(config.session.refreshSession) writeHead(req, res);
                return next();
            }
            redisClient.hdel(id, 'session');
            req.session = generate();
            next();
        });
    }
};

exports.save = function (req, res, next) {
    if (notConn) {
        if (next) {
            next();
        }
        return false;
    }
    let id = req.session.id;
    if (!id) {
        if (next) {
            next();
        }
        return false;
    }
    let json = JSON.stringify(req.session);
    redisClient.hset(id, 'session', json,
        function (err) {
            if (err) {
                log.error('session save error');
                log.error(err);
            } else {
                redisClient.expire(id, config.session.redisExpire, function (err) {
                    if (err) {
                        log.error('redis expire error');
                        log.error(err);
                    }
                });
            }
            writeHead(req, res);
            if (next) {
                next(err);
            }
        });
};

exports.del = function (req, res, next) {
    if (notConn) {
        if (next) {
            next();
        }
        return false;
    }
    let id = req.cookies[config.session.sessionKey];
    if (!id) {
        if (next) {
            next();
        }
        return false;
    }
    redisClient.del(id,function(err){
        if (err) {
            log.error('redis delete error');
            log.error(err);
        }
        res.clearCookie(config.session.sessionKey);
        next(err);
    });
};