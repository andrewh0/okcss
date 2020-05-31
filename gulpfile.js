const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const concatCss = require("gulp-concat-css");
const csso = require("gulp-csso");
const rename = require("gulp-rename");

exports.default = () => {
  return gulp
    .src("./src/normalize.css")
    .pipe(gulp.src("./src/default.css"))
    .pipe(autoprefixer())
    .pipe(concatCss("combined.css"))
    .pipe(csso())
    .pipe(
      rename({
        basename: "default",
        extname: ".min.css",
      })
    )
    .pipe(gulp.dest("dist"));
};
