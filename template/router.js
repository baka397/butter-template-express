'use strict';
/**
 * 自动注入所有Controller
 */
let fs = require('fs');
let path = require('path');
module.exports = function(app) {
    let controllerDir = path.join(__dirname, 'controllers/');
    let files = fs.readdirSync(controllerDir);
    for (let i in files) {
        let filename = files[i];
        let controller = require(path.join(controllerDir, filename));
        app.use(controller.requestMapping, controller.router);
    }
};