'use strict';
const mongoose  = require('mongoose');
const validate = require('mongoose-validator');
const BaseModel = require('./base_model');
const Schema = mongoose.Schema;
let testNameValidator = [
    validate({
        validator: 'isLength',
        arguments: [2, 20],
        message: '标签名称需要{ARGS[0]}-{ARGS[1]}之间的文字'
    }),
    validate({
        validator: 'matches',
        arguments: [/^[\u4e00-\u9fa5\u0800-\u4e00A-Za-z0-9\.\_\'\,\-\s]+$/],
        message: '标签名称只能为中文,字母,数字,空格或特殊字符(._\',-)'
    })
];
let TestSchema = new Schema({
    name: {type: String, required:[true, '必须填写名称'], unique: true, validate: testNameValidator}, //名称
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});
TestSchema.plugin(BaseModel);
TestSchema.index({create_at: -1});
mongoose.model('Test', TestSchema);