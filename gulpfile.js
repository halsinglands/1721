const { series, parallel, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const del = require('del');
const browserSync = require('browser-sync').create();

function clean() {
  return del("dist");
}

function stylesheet() {
  return src([
    'node_modules/normalize.css/normalize.css',
    'src/scss/base.scss'
  ])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat("bundle.css"))
    .pipe(cleanCss())
    .pipe(dest('dist/'));
}
function hypertext() {
  return src('src/**/*.html')
    .pipe(dest('dist/'));
}

function browsersync() {
  browserSync.init({
    server: "dist"
  });
  watch('src/scss/*.scss', stylesheet).on('change', browserSync.reload);
  watch('src/**/*.html', hypertext).on('change', browserSync.reload);
}

exports.build = series(clean, parallel(stylesheet, hypertext));
exports.default = series(clean, parallel(stylesheet, hypertext), browsersync);
