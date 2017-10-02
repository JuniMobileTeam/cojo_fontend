/** require import **/
var gulp = require('gulp');
var jade = require('gulp-jade');

/** variables **/
const distDir = './dist';

const jadeConfig = {
  pageSourceFiles: './src/jade/pages/*.jade',
  allSourceFiles: './src/jade/**/*.jade',
  distDir: distDir
}


gulp.task('jade', function() {
  gulp.src(jadeConfig.pageSourceFiles)
  .pipe(jade({
    pretty: true
  }))
  .pipe(gulp.dest(jadeConfig.distDir))
})

gulp.task('watch', function() {
  gulp.watch(jadeConfig.allSourceFiles, ['jade'])
});

gulp.task('default', ['jade', 'watch']);
