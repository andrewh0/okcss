const gulp = require("gulp");
const rename = require("gulp-rename");

const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

exports.default = () =>
  gulp
    .src("./src/default.css")
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(
      rename({
        basename: "default",
        extname: ".min.css",
      })
    )
    .pipe(gulp.dest("dist"));
