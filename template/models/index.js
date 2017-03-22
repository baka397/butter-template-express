'use strict';
const mongoose = require('mongoose');
const config = require('../config/');
const log = require('../log');
mongoose.Promise = Promise;
mongoose.connect(config.db, {
    server: {poolSize: 20}
}, function (err) {
    if (err) {
        log.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
    log.info('MongoDB connect succeed', config.db);
});

// models
require('./test');
exports.Test = mongoose.model('Test');