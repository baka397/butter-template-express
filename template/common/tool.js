var xlsx = require('node-xlsx');
var _ = require('lodash');
var queryString = require('querystring');

/**
 * 判断当前是否为ajax请求
 * @param req
 * @returns {boolean}
 */
exports.isAjaxRequest = function(req) {
    var requestType = req.headers['X-Requested-With'] || req.headers['x-requested-with'];
    var acceptType = req.headers['Accept'] || req.headers['accept'];
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
    req.query.pageSize=parseInt(req.query.pageSize)>global.CONFIG.pageSize?parseInt(req.query.pageSize):global.CONFIG.pageSize;
    if(req.query.pageSize>global.CONFIG.maxPageSize) req.query.pageSize = global.CONFIG.pageSize;
    if(req.query.pageNo>global.CONFIG.maxPageNo) req.query.pageNo = global.CONFIG.maxPageNo;
};