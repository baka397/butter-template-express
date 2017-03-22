'use strict';
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const minifycss = require('gulp-minify-css');
const del = require('del');
{{#if less}}
const less = require('gulp-less');
{{/if}}

/**
 * 清除
 */
gulp.task('clean', function(cb) {
    del(['*.zip','public','views','build/css','logs'], cb);
});
{{#if less}}
gulp.task('less', function(cb) {
    gulp.src('./build/less/*.less').pipe(less()).pipe(gulp.dest('./build/css')).on('end', cb); //编译less
});
{{/if}}

/**
 * 开发默认
 */
gulp.task('default',[{{#if less}}'less'{{/if}}],function() {
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
gulp.task('build',[{{#if less}}'less'{{/if}}],function() {
    gulp.src(['./build/img/**']).pipe(gulp.dest('./public/img'));
    gulp.src(['./build/css/*.css']).pipe(minifycss()).pipe(gulp.dest('./public/css')); //压缩工程输出工程
    gulp.src(['./build/css/plugins/**']).pipe(gulp.dest('./public/css/plugins'));//打包插件
    gulp.src(['./build/fonts/**']).pipe(gulp.dest('./public/fonts'));
    gulp.src(['./build/js/*.js']).pipe(uglify()).pipe(gulp.dest('./public/js')); //压缩工程输出文件
    gulp.src(['./build/js/plugins/**']).pipe(gulp.dest('./public/js/plugins'));//打包插件目录
    gulp.src(['./build/data/**']).pipe(gulp.dest('./public/data'));
    gulp.src(['./build/views/**']).pipe(gulp.dest('views'));
});
gulp.task('watch', function () {
    gulp.watch('build/**', ['default']);
});

gulp.task('buildwatch', function () {
    gulp.watch('build/**', ['build']);
});