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