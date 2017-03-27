'use strict';
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const minifycss = require('gulp-minify-css');
const del = require('del');
const less = require('gulp-less');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify'); //显示报错信息和报错后不终止当前gulp任务
const plumber = require('gulp-plumber'); //捕获处理任务中的错误

/**
 * 清除
 */
gulp.task('clean', function(cb) {
    del(['*.zip', 'public', 'views', 'build/css', 'logs'], cb);
});
gulp.task('less', function(cb) {
    //编译less
    gulp.src('./build/less/*.less')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        .pipe(gulp.dest('./build/css'))
        .on('end', cb);
});

/**
 * 开发默认
 */
gulp.task('default', ['less'], function() {
    gulp.src(['./build/img/**']).pipe(gulp.dest('./public/img'));
    gulp.src(['./build/css/**']).pipe(gulp.dest('./public/css'));
    gulp.src(['./build/fonts/**']).pipe(gulp.dest('./public/fonts'));
    gulp.src(['./build/js/**']).pipe(gulp.dest('./public/js'));
    gulp.src(['./build/data/**']).pipe(gulp.dest('./public/data'));
    gulp.src(['./build/views/**']).pipe(gulp.dest('views'));
});

/**
 * 上线编译任务
 */
gulp.task('build', ['less'], function() {
    gulp.src(['./build/img/**']).pipe(gulp.dest('./public/img'));
    gulp.src(['./public/img/**/*.{png,jpg,jpeg,gif,ico}']).pipe(imagemin({
        optimizationLevel: 7, //默认：3  取值范围：0-7（优化等级）
        progressive: true, //默认：false 无损压缩jpg图片
        interlaced: true, //默认：false 隔行扫描gif进行渲染
        multipass: true //默认：false 多次优化svg直到完全优化
    })).pipe(gulp.dest('./public/img')); //压缩图片
    gulp.src(['./build/css/*.css']).pipe(minifycss()).pipe(gulp.dest('./public/css')); //压缩工程输出工程
    gulp.src(['./build/css/plugins/**']).pipe(gulp.dest('./public/css/plugins'));//打包插件
    gulp.src(['./build/fonts/**']).pipe(gulp.dest('./public/fonts'));
    gulp.src(['./build/js/*.js']).pipe(uglify()).pipe(gulp.dest('./public/js')); //压缩工程输出文件
    gulp.src(['./build/js/plugins/**']).pipe(gulp.dest('./public/js/plugins'));//打包插件目录
    gulp.src(['./build/data/**']).pipe(gulp.dest('./public/data'));
    gulp.src(['./build/views/**']).pipe(gulp.dest('views'));
});
gulp.task('watch', function() {
    gulp.watch('build/**', ['default']);
});

gulp.task('buildwatch', function() {
    gulp.watch('build/**', ['build']);
});