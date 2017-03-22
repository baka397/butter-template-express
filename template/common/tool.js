'use strict';
const config = require('../config/');

/**
 * 判断当前是否为ajax请求
 * @param req
 * @returns {boolean}
 */
exports.isAjaxRequest = function(req) {
    let requestType = req.headers['X-Requested-With'] || req.headers['x-requested-with'];
    let acceptType = req.headers['Accept'] || req.headers['accept'];
    return {
        result:requestType==='XMLHttpRequest',
        needJson:requestType==='XMLHttpRequest'&&/application\/json/.test(acceptType)
    };
};

/**
 * 根据request对象设置分页数量
 * @param  {object} req request对象
 */
exports.setListInfo = function(req){
    req.query.pageNo=parseInt(req.query.pageNo)>0?parseInt(req.query.pageNo):0;
    req.query.pageSize=parseInt(req.query.pageSize)>config.pageSize?parseInt(req.query.pageSize):config.pageSize;
    if(req.query.pageSize>config.maxPageSize) req.query.pageSize = config.pageSize;
    if(req.query.pageNo>config.maxPageNo) req.query.pageNo = config.maxPageNo;
};

/**
 * 请求下个Promise
 * @param  {Object} err  错误信息
 * @param  {Object} data 传递数据
 * @return {Object}      Promise对象
 */
exports.nextPromise = function(err,data){
    return new Promise(function(resolve,reject){
        if(err) reject(err);
        else resolve(data);
    });
};

/**
 * 过滤限制数据
 * @param  {Object} data 过滤前数据
 * @return {String}      
 */
exports.filterLimitData = function(data){
    let result=Object.assign({},data);
    if(result.password) delete result.password;
    if(result.oldPassword) delete result.oldPassword;
    if(result.email) delete result.email;
    return JSON.stringify(result);
};

exports.isObjEmpty = function(obj) {
    // Speed up calls to hasOwnProperty
    let hasOwnProperty = Object.prototype.hasOwnProperty;

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== 'object') return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (let key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
};