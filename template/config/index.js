'use strict';
const pkg = require('../package.json');

// 默认配置
let defaultConfig = {
    //基础配置
    project: {
        port: 8080,                                         // 项目端口
        name: pkg.name,                                     // 项目名称
        version: pkg.version                                // 项目版本
    },
    {{#if mongoose}}
    db:'',                                                  // More info http://mongoosejs.com/docs/api.html#index_Mongoose-createConnection
    {{/if}}
    log: {
        path: './logs/',                                    // 日志路径
        type: 'console',                                    // 日志打印类型：console、fileLog、dateFileLog
        level: 'debug'                                      // 日志打印级别：trace、debug、info、warn、error、fatal
    },
    {{#if redis}}
    {{#if redis-cluster}}
    redis:{
        port:6379,
        host:'127.0.0.1'
    },
    {{/else}}
    redisNodes: [],
    {{/if}}
    {{/if}}
    //运营配置
    maxPageNum:10,                                          //最大分页数
    pageSize:10,                                            //默认列表数
    maxPageSize:150                                         //最大列表数
};
// 启动配置，部署环境变量：dev、test、uat、online
let startupConfig = process.env.CFG_PATH || ('./config-' + (process.env.NODE_ENV || 'dev'));
// 获取环境配置
let config = {};
try {
    global.console.log('启动配置文件：%s', startupConfig);config = require(startupConfig);
} catch(e) {
    global.console.error('未找到启动配置：%s', startupConfig);
}
// 获取当前部署环境对应配置
config = Object.assign({}, defaultConfig, config || {});

module.exports = config;