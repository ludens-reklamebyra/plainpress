const gulp = require('gulp');
const sass = require('gulp-sass');
const browserify = require('browserify');
const babelify = require('babelify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const bufferifyify = require('vinyl-buffer');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const argv = require('yargs').argv;
const livereload = require('gulp-livereload');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const scsslint = require('gulp-scss-lint');
const eslint = require('gulp-eslint');
const runSequence = require('run-sequence');
const phplint = require('phplint').lint
const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');

const dev = !argv.production ? true : false;

gulp.task('bundle', () => {
  const bundler = browserify({
    cache: {},
    packageCache: {},
    entries: ['./resources/js/app.js'],
    debug: dev
  });

  bundler.transform(babelify, {presets: ['es2015']});

  if (dev) bundler = watchify(bundler);

  bundler.on('update', bundle);

  function bundle() {
    return bundler
      .bundle()
      .pipe(source('./resources/js/app.js'))
      .pipe(bufferifyify())
      .pipe(gulpif(!dev, uglify()))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('./assets/js/'))
  }

  bundle();
});

gulp.task('sass', () => {
  gulp.src('./resources/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: dev ? 'nested' : 'compressed'
    }).on('error', sass.logError))
    .pipe(gulpif(dev, sourcemaps.write()))
    .pipe(autoprefixer({ browsers: ['last 3 versions','> 1%'] }))
    .pipe(gulp.dest('./assets/css'))
    .pipe(gulpif(dev, livereload()));
});

gulp.task('watch', () => {
  livereload.listen();
  gulp.watch('./resources/scss/**/*.scss', ['sass']);
  gulp.watch(['./**/*.php'], () => {
    livereload.reload();
  });
});

gulp.task('scss-lint', () => {
  return gulp.src([
    './resources/scss/**/*.scss',
    '!./resources/scss/settings/_mixins.scss'])
    .pipe(scsslint());
});

gulp.task('js-lint', () => {
  return gulp.src(['./resources/js/**/*.js'])
    .pipe(eslint({
      extends: 'eslint:recommended',
      ecmaFeatures: {
        modules: true,
        jsx: true,
        classes: true,
        blockBindings: true,
        arrowFunctions: true,
        forOf: true
      },
      env: {
        node: false,
        browser: true
      }
    }))
    .pipe(eslint.format());
});

gulp.task('php-lint', (cb) => {
  phplint(['./**/*.php', '!./node_modules/**/*'], {limit: 10}, (err, stdout, stderr) => {
    if (err) {
      cb(err);
      process.exit(1);
    }
    cb();
  })
});

gulp.task('compile', ['bundle', 'sass']);
gulp.task('lint', ['scss-lint', 'js-lint', 'php-lint']);
gulp.task('default', () => {
  runSequence('lint', ['compile', 'watch']);
});
