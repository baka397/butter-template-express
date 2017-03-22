//状态码
module.exports={
    SUCCESS:0, //成功
    FORBIDDEN:403, //无权限
    NOT_FOUND:404, //无页面
    ERROR:110, //可预期错误
    {{#if mongoose}}
    MONGO_ERROR:111, //数据库更新错误
    MONGO_UNIQUE_ERROR:11000,//数据库已存在唯一键
    {{/if}}
    {{#if redis}}
    REDIS_ERROR:112, //redis错误
    {{/if}}
    UNKNOWN_ERROR:500, //未知错误
    GETWAY_ERROR:502 //访问错误
};