'use strict';
const queryString = require('querystring');
const request = require('superagent');
const config = require('../config/');
const log = require('../common/log');
const tool = require('../common/tool');
const STATUS_CODE = require('../enums/status_code');
exports.services = {
    'test': config.api + '/'
};

/**
 * 请求接口数据
 * @param  {String} url        请求地址
 * @param  {Object} data       发送数据
 * @param  {String} method     请求类型
 * @param  {Boolen} closeCheck 是否关闭验证
 * @param  {Boolen} json       是否以json格式传输数据
 * @return {Object}            Promise对象
 */
function apiRequest(url,data,method,closeCheck,json){
    if(!url){
        let error = new Error('无效的API请求地址');
        error.status = STATUS_CODE.ERROR;
        return tool.nextPromise(error);
    }
    let idReg=/\:id/;
    if(idReg.test(url)){
        url=url.replace(idReg,data.id);
        delete data.id;
    }
    method=method?method.toLowerCase():'get';
    if (method === 'get' && !tool.isObjEmpty(data)) {
        url += (/\?/.test(url) ? '&' : '?') + queryString.stringify(data);
    }
    log.info('API '+method.toUpperCase()+': '+url);
    return new Promise(function(resolve,reject){
        let requestObj=request[method](url)
        .timeout({
            response: 5000,  // Wait 5 seconds for the server to start sending,
            deadline: 60000, // but allow 1 minute for the file to finish loading.
        });
        if(!json){
            requestObj.type('form');
        }
        if(method!=='get'&&!tool.isObjEmpty(data)){
            requestObj.send(data);
            log.info('请求数据');
            log.info(tool.filterLimitData(data));
        }
        requestObj.end(function(err,res){
            //处理超时错误
            if((err&&parseInt(err.status)===408)||!res){
                log.error(err);
                return reject(err);
            }
            log.info(res.body);
            if(res.status===200&&(closeCheck||res.body.code===STATUS_CODE.SUCCESS)){
                if(closeCheck) return resolve(res.body);
                else return resolve(res.body.data);
            }else{
                let error = new Error(res.body.msg||'API处理错误');
                error.status = res.body.code||res.status;
                return reject(error);
            }
        });
    });
}
exports.request=apiRequest;