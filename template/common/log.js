'use strict';
const fs = require('fs');
const path = require('path');
const log4js = require('log4js');
const config = require('../config/');
const tool = require('../common/tool');
let logPath = process.env.LOG_PATH || path.join(__dirname,'../',config.log.path), logType = config.log.type, logLevel = config.log.level;
//同步创建日志目录
try{
    fs.statSync(logPath);
}catch(e){
    fs.mkdirSync(logPath);
}
log4js.configure({
    appenders: [
        {
            type: 'console',
            category: 'console'
        }, // 控制台输出
        {
            type: 'file',
            category: 'fileLog',
            filename: path.join(logPath, 'log.log'),
            maxLogSize: 2 * 1024 * 1024 * 1024,
            backups: 7
        } , // 单文件输出
        {
            type: 'dateFile',
            category: 'dateFileLog',
            filename: path.join(logPath, 'log'),
            pattern: '-yyyy-MM-dd.log',
            backups: 7,
            alwaysIncludePattern: true

        } // 日期格式文件输出
    ],
    replaceConsole: false,   //替换console.log
    levels: {
        console: logLevel,
        fileLog: logLevel,
        dateFileLog: logLevel
    }
});
let logger = log4js.getLogger(logType || 'dateFileLog');

exports.use = function (app) {
    app.use(log4js.connectLogger(logger, {level: logLevel, format: ':method :url'}));
    //记录传输数据
    app.use(function(req,res,next){
        switch(req.method){
        case 'GET':
            logger.info(tool.filterLimitData(req.query));
            break;
        default:
            logger.info(tool.filterLimitData(req.body));
        }
        next();
    });
};
const logTypeList = ['info','error','trace','debug','warn','fatal'];
logTypeList.forEach(function(type){
    exports[type]=function(msg){
        logger.info(msg);
    };
});