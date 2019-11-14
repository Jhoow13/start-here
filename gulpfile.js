const gulp = require("gulp"),
  browserSync = require("browser-sync").create(),
  plumber = require("gulp-plumber"),
  notify = require("gulp-notify"),
  clean = require("gulp-clean"),
  concat = require("gulp-concat"),
  babel = require("gulp-babel"),
  uglify = require("gulp-uglify"),
  pug = require("gulp-pug"),
  sass = require("gulp-sass"),
  cssNano = require("gulp-cssnano");
(autoprefixer = require("gulp-autoprefixer")),
  (sourcemaps = require("gulp-sourcemaps")),
  (imageMin = require("gulp-imagemin"));

const files = {
  pugFiles: ["src/index.pug"],
  scssFiles: ["src/sass/all.scss"],
  jsFiles: ["src/js/*.js"],
  imgFiles: ["src/img/**/*.*"]
};

gulp.task("clean", function() {
  return gulp.src("dist/*").pipe(clean());
});

gulp.task("pug", function() {
  return gulp
    .src(files.pugFiles)
    .pipe(
      plumber({
        errorHandler: function(err) {
          notify.onError({
            title: "Erro ali > " + err.plugin,
            message: err.toString()
          })(err);
        }
      })
    )
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest("dist/"));
});

gulp.task("css-dev", function() {
  return gulp
    .src(files.scssFiles)
    .pipe(
      plumber({
        errorHandler: function(err) {
          notify.onError({
            title: "Erro ali > " + err.plugin,
            message: err.toString()
          })(err);
        }
      })
    )
    .pipe(sourcemaps.init())
    .pipe(concat("style.min.css"))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssNano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/css/"));
});

gulp.task("css-prod", function() {
  return gulp
    .src(files.scssFiles)
    .pipe(plumber())
    .pipe(concat("style.min.css"))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssNano())
    .pipe(gulp.dest("dist/css/"));
});

gulp.task("js", function() {
  return gulp
    .src(files.jsFiles)
    .pipe(
      plumber({
        errorHandler: function(err) {
          notify.onError({
            title: "Erro ali > " + err.plugin,
            message: err.toString()
          })(err);
        }
      })
    )
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(gulp.dest("dist/js/"));
});

gulp.task("img", function() {
  gulp
    .src(files.imgFiles)
    .pipe(
      plumber({
        errorHandler: function(err) {
          notify.onError({
            title: "Erro ali > " + err.plugin,
            message: err.toString()
          })(err);
        }
      })
    )
    .pipe(imageMin())
    .pipe(gulp.dest("dist/img"));
});

gulp.task("reload", function(done) {
  browserSync.reload();
  done();
});

gulp.task("dev", ["pug", "img", "css-dev", "js"], function() {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });

  gulp.watch([files.pugFiles, "src/pug/**/*.pug"], ["pug", browserSync.reload]);
  gulp.watch(
    [files.scssFiles, "src/sass/**/*.scss"],
    ["css-dev", browserSync.reload]
  );
  gulp.watch([files.jsFiles, "src/js/**/*.js"], ["js", browserSync.reload]);
});

gulp.task("default", ["dev"]);
gulp.task("prod", ["pug", "img", "css-prod", "js"]);
