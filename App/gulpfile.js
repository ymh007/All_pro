var gulp = require('gulp');
var clean = require('gulp-clean');
var rev = require('gulp-rev');
var htmlhint = require('gulp-htmlhint');
var htmlmin = require('gulp-htmlmin');
var jsonlint = require('gulp-jsonlint');
var revCollector = require('sog-gulp-rev-collector');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');

gulp.task('_jscompile-release', function () {
    var stream =
        gulp.src(['src/**/*.js'])
            .pipe(rev())
            .pipe(gulp.dest('dist'))
            .pipe(rev.manifest('js.json'))
            .pipe(gulp.dest('rev'));
    return stream;
});


gulp.task('_default-htm-release', function () {
    var stream =
        gulp.src(['src/**/*.htm'])
            .pipe(htmlhint({ 'doctype-first': false }))
            .pipe(htmlhint.reporter())
            .pipe(htmlhint.failReporter())
            .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
            .pipe(gulp.dest('dist'));
    return stream;
});


gulp.task('_htmlmin-release', function () {
    var stream =
        gulp.src(['src/**/*.html', '!src/index.html'])
            .pipe(rev())
            .pipe(gulp.dest('dist'))
            .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest('dist'))
            .pipe(rev.manifest('html.json'))
            .pipe(gulp.dest('rev'));
    return stream;
});

gulp.task('_jsonmin-release', function (cb) {
    var stream =
        gulp.src(['src/**/*.json', '!src/config.json', '!src/common-config.json'])
            .pipe(jsonlint())
            .pipe(jsonlint.reporter())
            .pipe(jsonlint.failOnError())
            .pipe(rev())
            .pipe(gulp.dest('dist'))
            .pipe(rev.manifest('json.json'))
            .pipe(gulp.dest('rev'));
    return stream;
});


gulp.task('_css-release', function () {

    var stream =
        gulp.src('src/**/*.css')
            .pipe(rev())
            .pipe(gulp.dest('dist'))
            // .pipe(cssmin())
            // .pipe(rename({ suffix: '.min' }))
            // .pipe(gulp.dest('dist'))
            .pipe(rev.manifest('css.json'))
            .pipe(gulp.dest('rev'));
    return stream;

});


gulp.task('_image-release', function () {

    var stream =
        gulp.src(['src/**/*.jpg', 'src/**/*.gif', 'src/**/*.png'])
            .pipe(rev())
            .pipe(gulp.dest('dist'))
            .pipe(imagemin({
                progressive: true//类型：Boolean 默认：false 无损压缩jpg图片
            }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest('dist'))
            .pipe(rev.manifest('image.json'))
            .pipe(gulp.dest('rev'));
    return stream;

});

gulp.task('_config-release', function () {
    var stream = gulp.src(['src/*.config', 'src/**/*.pdf', 'src/**/*.docx', 'src/**/*.xlsx', 'src/**/*.pptx', 'src/**/*.swf', 'src/config.json', 'src/common-config.json', 'src/index.html'])
        .pipe(gulp.dest('dist'));
    return stream;

});


gulp.task('release', [
    '_jscompile-release',
    '_default-htm-release',
    '_htmlmin-release',
    '_jsonmin-release',
    '_css-release',
    '_image-release',
    '_config-release'

], function () {
    var stream =
        gulp.src(['dist/**/*.html', 'dist/**/*.htm', 'dist/**/*.js', 'dist/**/*.json', 'dist/**/*.css'])
            .pipe(revCollector(['rev/*.json'], { 'replaceReved': true }))
            .pipe(gulp.dest('dist'));
    return stream;
});


gulp.task('default', ['release'], function () {
    gulp.src(['rev'])
        .pipe(clean());

});