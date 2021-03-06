/** require import **/
const gulp = require('gulp');
/* for jade */
const jade = require('gulp-jade');
/* for SASS */
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoPrefixer = require('autoprefixer');
/* auto reload browser */
const browserSync = require('browser-sync').create();

/** variables **/
/* general */
const distDir = './dist';

/* for jade - HTML pre-processors */
const jadeConfig = {
  pageSourceFiles: './src/jade/pages/*.jade',
  allSourceFiles: './src/jade/**/*.jade',
  distDir: distDir
}

/* for sass - css pre-processors */
const sassConfig = {
  allSourceFiles: './src/sass/**/*.scss',
  targetFile: './src/sass/all.scss',
  distFileName: 'all.css',
  distDir: distDir + "/css"
}

/* Settings */
const siteProxy = "jok-font-end.test"

/*** Gulp tasks ***/
/* for sass */
gulp.task('sass', function() {
  return gulp.src(sassConfig.targetFile)
  .pipe(sourcemaps.init())
  .pipe(concat(sassConfig.distFileName))
  .pipe(postcss([ autoPrefixer() ]))
  .pipe(sass({outputstyle: 'compressed'}).on('error', sass.logError))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(sassConfig.distDir))
  .pipe(browserSync.stream({match: '**/*.css'}));
});

/* for jade */
gulp.task('jade', function() {
  gulp.src(jadeConfig.pageSourceFiles)
  .pipe(jade({
    pretty: true
  }))
  .pipe(gulp.dest(jadeConfig.distDir))
});

/* gulp - continue to watch the changes */
gulp.task('watch', function() {
  browserSync.init(null, {
    proxy: 'http://' + siteProxy,
    host: siteProxy,
    browser: process.platform === 'linux' ? 'google-chrome' : 'google chrome',
    open: 'external'
  });
  gulp.watch(jadeConfig.allSourceFiles, ['jade']);
  gulp.watch(sassConfig.allSourceFiles, ['sass']);

});
/* default - help to only run 'gulp' in the command-line */
gulp.task('default', ['jade', 'sass', 'watch']);
