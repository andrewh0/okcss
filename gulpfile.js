const gulp = require("gulp");
const rename = require("gulp-rename");

const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

exports.default = () =>
  gulp
    .src("./src/ok.css")
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(
      rename({
        basename: "ok",
        extname: ".min.css",
      })
    )
    .pipe(gulp.dest("dist"));
