var gulp = require('gulp');
var ts = require('gulp-typescript');
 
gulp.task('typescript:models', function() {
    var tsResult = gulp.src(
        'src/typings.d.ts',
        'models/user.ts').pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
    return tsResult.js.pipe(gulp.dest('./models'));
});

gulp.task('default', ['typescript:models'])