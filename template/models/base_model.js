//给所有的 Model 扩展功能
module.exports = function (schema) {
    schema.pre('save', function (next) {
        if(this.update_at){
            this.update_at = new Date;
        }
        next();
    });
};