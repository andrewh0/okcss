const gulp = require("gulp");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");

function buildCSS() {
  return gulp
    .src("./src/default.css")
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(
      rename({
        basename: "default",
        extname: ".min.css",
      })
    )
    .pipe(gulp.dest("dist"));
}

exports.default = buildCSS;
