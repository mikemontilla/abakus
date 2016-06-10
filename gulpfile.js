const gulp =  require('gulp');

const fs = require('fs');
const browserify = require('browserify');

gulp.task('babelify', function(){
    const JS_DIRECTORY = __dirname + '/public/js/';
    browserify(JS_DIRECTORY + 'index.js', {debug:true})
    .transform('babelify', {presets:['es2015','react']})
    .bundle()
    .pipe(fs.createWriteStream(JS_DIRECTORY + 'bundle.js'));
});
