'use strict';
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const log = require('./log');
const router = require('./router');
const tool = require('./common/tool');
const pkg = require('./package.json');
{{#if session}}
const session = require('./moudles/session');
{{/if}}

//Init app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// Add favicon & public file
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

{{#if session}}
// set session
app.use(session());
{{/if}}

// render global variable
app.use(function(req, res, next) {
    res.locals.version = pkg.version;
    next();
});

// Set log middleware
log.use(app);

// Load routers
router(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('ERROR NO PAGE FOUND');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function (err, req, res, next) {
    if(err.code!==404) log.error(err);
    let code = err.code || err.status || 500;
    let message = err.message || err.stack;
    if (/TIMEDOUT/i.test(code) || err.syscall == 'connect' || err.hasOwnProperty('connect')) {
        code = 408;
        message = '网络异常，请稍候再试';
    }else if(/^\d+$/.test(code)){
        switch(code){
        case 404:
            message = '找不到当前页面';
            break;
        case 500:
            message = '系统错误';
            break;
        case 502:
            message = '数据访问异常，请稍后重试';
            break;
        }
    }else{
        code=500;
        message = '未知异常，请记录相关地址/操作并联系管理员处理';
    }

    // 返回数据
    let params = {
        title: err.title || code,
        code: code,
        msg: message
    };

    try {
        let reqAjaxInfo=tool.isAjaxRequest(req);
        if (reqAjaxInfo.needJson) { //判定是否需要以json形式返回
            res.send(params);
        } else {
            //设置特殊情况下的http状态码，否则为200
            switch(code){
            case 403:
            case 404:
            case 500:
                res.status(code);
                break;
            }
            params.isAjax=reqAjaxInfo.result; //判定是否为ajax请求
            res.render('common/error',params);
        }
    } catch (e) {
        log.error(e);
        next(e);
    }
});

module.exports = app;