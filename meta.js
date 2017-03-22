'use strict';
module.exports={
    'prompts': [
        {
            'name':'name',
            'type':'input',
            'default':'express-demo',
            'message':'项目名称\nProject name'
        },
        {
            'name':'version',
            'type':'input',
            'default':'1.0.0',
            'message':'版本号\nVersion'
        },
        {
            'name':'description',
            'type':'input',
            'default':'A express simple demo',
            'message':'项目描述\nProject description'
        },
        {
            'name':'redis',
            'type':'confirm',
            'default':true,
            'message':'是否开启redis?\nOpen redis?'
        },
        {
            'name':'redis-cluster',
            'type':'confirm',
            'default':true,
            'message':'是否开启redis集群?\nOpen redis cluster?',
            'when':function(answers) {
                return answers.redis;
            }
        },
        {
            'name':'redis-session',
            'type':'confirm',
            'default':true,
            'message':'是否开启redis session?\nOpen redis session?',
            'when':function(answers) {
                return answers.redis;
            }
        },
        {
            'name':'mongoose',
            'type':'confirm',
            'default':true,
            'message':'是否开启mongoose?\nOpen mongoose?'
        },
        {
            'name':'api',
            'type':'confirm',
            'default':true,
            'message':'是否开启api请求?\nOpen api?'
        },
        {
            'name':'gulp',
            'type':'confirm',
            'default':true,
            'message':'是否开启gulp?\nOpen gulp?'
        },
        {
            'name':'less',
            'type':'confirm',
            'default':true,
            'message':'是否开启less?\nOpen less?',
            'when':function(answers) {
                return answers.gulp;
            }
        },
        {
            'name':'eslint',
            'type':'confirm',
            'default':true,
            'message':'是否开启eslint?\nOpen eslint?'
        },
        {
            'name':'unit-test',
            'type':'confirm',
            'default':true,
            'message':'是否开启单元测试?\nOpen unit test?'
        },
        {
            'name':'cov-test',
            'type':'confirm',
            'default':true,
            'message':'是否开启覆盖率测试?\nOpen unit test with coverage?',
            'when':function(answers) {
                return answers['unit-test'];
            }
        }
    ],
    'filters':{
        'redis':'common/redis.js',
        'redis-session':'middlewares/session.js',
        'mongoose':['models/**','proxy/**'],
        'api':'modules/api.js',
        'gulp':['build/**','gulpfile.js'],
        'less':'build/less/**',
        'eslint':'.eslintrc.js',
        'unit-test':'test/**'
    }
}