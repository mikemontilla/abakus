const gulp =  require('gulp');
const babel = require('gulp-babel');
const fs = require('fs');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
/*gulp.task('babelify-client', function(){
    const JS_DIRECTORY = __dirname + '/public/js/';
    browserify(JS_DIRECTORY + 'index.js', {debug:true})
    .transform('babelify', {presets:['es2015','react']})
    .bundle()
    .pipe(fs.createWriteStream(JS_DIRECTORY + 'bundle.js'));
});*/
