const { series, parallel, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const del = require('del');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
const minify = require('gulp-minify');

function clean() {
  return del("docs");
}

function stylesheet() {
  return src([
    'node_modules/normalize.css/normalize.css',
    'src/scss/base.scss'
  ])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat("bundle.css"))
    .pipe(cleanCss())
    .pipe(dest('docs/'));
}

function javascript() {
  return src([
    'node_modules/qrcode-generator/qrcode.js',
    'src/js/*.js'
  ], { allowEmpty: true })
    .pipe(concat("main.js"))
    .pipe(minify({noSource: true}))
    .pipe(dest('docs/'));
}

function hypertext() {
  return src('src/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(dest('docs/'));
}

function browsersync() {
  browserSync.init({
    server: "docs"
  });
  watch('src/scss/*.scss', stylesheet).on('change', browserSync.reload);
  watch('src/js/*.js', javascript).on('change', browserSync.reload);
  watch('src/**/*.html', hypertext).on('change', browserSync.reload);
}

exports.build = series(clean, parallel(stylesheet, javascript, hypertext));
exports.default = series(clean, parallel(stylesheet, javascript, hypertext), browsersync);
