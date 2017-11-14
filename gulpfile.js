'use strict';
/* 
    利用gulp-sass编译css
        *require();--导入模块
*/

var gulp = require('gulp');
var sass = require('gulp-sass');

var path = {
    sass:'./src/sass/*.scss',
    css:'./src/css/',
    js:'./src/js/*.js',
}

// 创建一个任务---用来编译sass
gulp.task('compileSass',function(){
    // 通过:命令行输入（项目根目录）：gulp 任务名 --运行任务
    console.log(999);
    
    //查找文件位置 
    // gulp.src('./src/sass/*.scss')//得到文件流(文件在内存中的状态)
    gulp.src('./src/sass/*.scss')//得到文件流(文件在内存中的状态)

        // 利用pipe()方法处理  将sass 变成 css
    .pipe(sass({outputStyle:'expanded'})).on('error',sass.logError)// 编译sass文件
    // .pipe(gulp.dest('./src/css/'));//将编译成功后的css内容输出到指定的文件内(硬盘)
    .pipe(gulp.dest('./src/css/'));//将编译成功后的css内容输出到指定的文件内(硬盘)
});

// 监听文件的任务
gulp.task('jtSass',function(){
    // 监听search.scss文件---如果有修改，则执行compileSass任务
    // gulp.watch('./src/sass/*.scss',['compileSass'])
    gulp.watch('./src/sass/*.scss',['compileSass'])

})


// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');

// // 合并文件
// gulp.task('mergeJS',function(){
//     // 查找文件位置
//     gulp.src(path.js)

//         // 合并js文件
//         .pipe(concat('public.js'))

//         // 输出（未压缩）
//         .pipe(gulp.dest('./dist.js'))

//         // 压缩文件
//         .pipe(rename({suffix:'.min'}))

//         // 输出压缩后的文件
//         .pipe(gulp.dest('./dist/js'))
// });

// gulp.task('default',function(){
//     console.log(gulp);
// })