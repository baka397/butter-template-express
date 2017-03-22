'use strict';
const queryString = require('querystring');
const request = require('superagent');
const config = require('../config/');
const log = require('../log');
const tool = require('./tool');
const STATUS_CODE = require('../enums/status_code');
const URL = {
    'test':'/'
};

/**
 * 请求接口数据
 * @param  {String} action 动作名称
 * @param  {Object} data   发送数据
 * @param  {String} method 请求类型
 * @return {Object}        Promise对象
 */
function apiRequest(action,data,method){
    let url = URL[action];
    if(!url){
        let error = new Error('无效的API请求地址');
        error.status = STATUS_CODE.ERROR;
        return tool.nextPromise(error);
    }
    url = config.api+url;
    let idReg=/\:id/;
    if(idReg.test(url)){
        url=url.replace(idReg,data.id);
        delete data.id;
    }
    method=method?method.toLowerCase():'get';
    if (method === 'get' && !tool.isObjEmpty(data)) {
        url += (/\?/.test(url) ? '&' : '?') + queryString.stringify(data);
    }
    log.info(method.toUpperCase(),url);
    return new Promise(function(resolve,reject){
        let requestObj=request[method](url)
        .timeout({
            response: 5000,  // Wait 5 seconds for the server to start sending,
            deadline: 60000, // but allow 1 minute for the file to finish loading.
        });
        if(method!=='get'&&!tool.isObjEmpty(data)){
            requestObj.send(data);
            log.info('请求数据');
            log.info(tool.filterReqLog(data));
        }
        requestObj.end(function(err,res){
            //处理超时错误
            if((err&&parseInt(err.status)===408)||!res){
                log.error(err);
                return reject(err);
            }
            log.info(res.body);
            if(res.status===200&&res.body.code===STATUS_CODE.SUCCESS){
                return resolve(res.body.data);
            }else{
                let error = new Error(res.body.msg||'API处理错误');
                error.status = res.body.code||res.status;
                return reject(error);
            }
        });
    });
}
exports.request=apiRequest;