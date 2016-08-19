var gulp = require('gulp');

// 清理文件
gulp.task('clean', function () {
    var rimraf = require('gulp-rimraf');
    return gulp.src('./dist/', { read: false })
        .pipe(rimraf());
});

// angular模版缓存
gulp.task('template', function() {
    var templateCache = require('gulp-angular-templatecache');
    return gulp.src(['./src/js/directive/**/*.html', './src/js/modules/**/*.html'])
        .pipe(templateCache({ module: 'app' }))
        .pipe(gulp.dest('./src/bundle/'));
});

// js文件合并
gulp.task('browserify', function() {
    var browserify = require('browserify'),
        sourcemaps = require('gulp-sourcemaps'),
        source = require('vinyl-source-stream'),
        buffer = require('vinyl-buffer');
    return browserify({ entries: './src/js/app.js', debug: true })
        .bundle()
        .pipe(source('app.bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./src/bundle/'));
});

// sass文件编译
gulp.task('sass', function () {
    var sass = require('gulp-sass');
    return gulp.src('./src/scss/app.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./src/bundle/'));
});

// 文件变更监听
gulp.task('watch', function () {
    gulp.watch(['./src/tpls/*.html', './src/views/**/*.html', './src/js/modules/**/*.html'], ['template']);
    gulp.watch(['./src/js/**/*.js', './src/bundle/templates.js'], ['browserify']);
    gulp.watch('./src/scss/**/*.scss', ['sass']);
});

// 本地服务
gulp.task('server', function() {
    var connect = require('gulp-connect');
    connect.server({ livereload: true, root: 'src', port: 5000 });
});

// 打开浏览器
gulp.task('open', function() {
    var open = require('gulp-open');
    gulp.src('./src/index.html')
        .pipe(open({ uri: 'http://localhost:5000' }));
});

// 文件后缀hash
gulp.task('usemin', function() {
    var concat = require('gulp-concat'),
        csso = require('gulp-csso'),
        rev = require('gulp-rev'),
        usemin = require('gulp-usemin'),
        uglify = require('gulp-uglify');
    return gulp.src('./src/index.html').pipe(usemin({
        'libcss': [concat('css/lib.css'), csso(), rev()],
        'libjs': [concat('js/lib.js'), uglify(), rev()],
        'appcss': [concat('css/app.css'), csso(), rev()],
        'appjs': [concat('js/app.js'), uglify(), rev()]
    })).pipe(gulp.dest('./dist/'));
});

// 静态文件copy
gulp.task('copy', function() {
    gulp.src(['./src/js/globalConfig.js', './src/js/globalConfig.js.etpl'])
        .pipe(gulp.dest('./dist/js/'));
    gulp.src(['./src/vendor/bootstrap/dist/fonts/*', './src/vendor/font-awesome/fonts/*'])
        .pipe(gulp.dest('./dist/fonts/'));
    gulp.src('./src/vendor/select2/*.png').pipe(gulp.dest('./dist/css/'));
    gulp.src('./src/audio/*').pipe(gulp.dest('./dist/audio/'));
    gulp.src('./src/img/*').pipe(gulp.dest('./dist/img/'));
})

var sequence = require('run-sequence');

gulp.task('dev', function() {
    sequence('template', 'browserify', 'sass', function() {
        gulp.start('watch', 'server', 'open');
    })
})

gulp.task('deploy', ['clean'], function() {
    sequence('template', 'browserify', 'sass', function() {
        gulp.start('copy', 'usemin');
    })
});

gulp.task('default', ['clean']);
