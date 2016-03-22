var gulp = require('gulp');
var print = require('gulp-print');
var del = require('del');
var changed = require('gulp-changed-in-place');
var gulpIf = require('gulp-if');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var debounce = require('lodash').debounce;

gulp.task('clean', done =>
  del('lib/**/*', done));

gulp.task('copy', () =>
  gulp.src(['src/**/*', '!src/**/*.es6'])
  .pipe( /*only*/ changed /*files*/ ({ /*after*/ firstPass: true }))
  .pipe(gulp.dest('lib')));

gulp.task('babel', done =>
  gulp.src('src/**/*.es*')
  .pipe(sourcemaps.init())
  .pipe(babel( /* .babelrc || */ { presets: ['es2015', 'stage-0'] }))
  .pipe(sourcemaps.write({
    includeContent: false,
    sourceRoot: 'src'
  }))
  .pipe(gulp.dest('lib')));

gulp.task('watch', () =>
  gulp.watch('src', { followSymlinks: true }, debounce(gulp.series(
    'copy', 'babel'), 2000)));

gulp.task('build',
  gulp.series('clean', 'copy', 'babel'));

gulp.task('default',
  gulp.series('build', 'watch'));
