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
  distDir: distDir + '/css'
}

/* for images */
const imagesConfig = {
  allSourceFiles: './src/images/**/*',
  distDir: distDir + '/images'
}

/* for js */
const jsConfig = {
  allSourceFiles: './src/js/**/*.js',
  distDir: distDir + '/js'
}

/* for font */
const fontsConfig = {
  allSourceFiles: './src/fonts/**/*',
  distDir: distDir + '/fonts'
}

const phpConfig = {
  allSourceFiles: './src/php/**/*',
  distDir: distDir + '/php'
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

/* move all images to dist folder */
gulp.task('images', function() {
  return gulp.src(imagesConfig.allSourceFiles)
    .pipe(gulp.dest(imagesConfig.distDir));
});

/* move all js file to dist folder */
gulp.task('js', function() {
  return gulp.src(jsConfig.allSourceFiles)
    .pipe(sourcemaps.init())
    .pipe(gulp.dest(jsConfig.distDir))
    .pipe(browserSync.stream({ match: '**/*.js' }));
});

/* move all font files in to dist folder */
gulp.task('fonts', function() {
  return gulp.src(fontsConfig.allSourceFiles)
  .pipe(gulp.dest(fontsConfig.distDir));
});

/* move all php files in to dist folder */
gulp.task('php', function() {
  return gulp.src(phpConfig.allSourceFiles)
    .pipe(gulp.dest(phpConfig.distDir));
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
gulp.task('default', ['jade', 'sass', 'images', 'js', 'fonts', 'php', 'watch']);
