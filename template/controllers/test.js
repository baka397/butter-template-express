/**
 * Test controller
 */
const express = require('express');
const router = express.Router();
const tool = require('../common/tool');
const TestProxy = require('../proxy/');
const STATUS_CODE = require('../enums/status_code');

exports.requestMapping = '/test';

//get list demo
router.get('/', function (req, res) {
    tool.setListInfo(req);
    res.send(req.query);
});

{{#if mongoose}}
//post test demo
router.post('/',function(req,res,next){
    let data=Object.create(null);
    data.name=req.body.name;
    TestProxy.newAndSave(data).then(function(result){
        res.send({
            code:STATUS_CODE.SUCCESS,
            data:result.id,
            message:'添加成功'
        });
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});
{{/if}}

{{#if api}}
router.post('/api/',function(req,res,next){
    api.request('test',req.body).then(function(data){
        res.send({
            code:STATUS_CODE.SUCCESS,
            data:data,
            message:'测试API成功'
        });
    }).catch(function(err){
        next(err);
    });
});
{{/if}}

exports.router = router;