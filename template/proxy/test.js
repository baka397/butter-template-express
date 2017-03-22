'use strict';
const Test = require('../models').Test;
/**
 * 新增测试
 * @param  {String} data  数据对象
 * @return {Object}       Promise对象
 */
function newAndSave(data){
    let test = new Test();
    test.name = data.name;
    return test.save();
}
exports.newAndSave = newAndSave;