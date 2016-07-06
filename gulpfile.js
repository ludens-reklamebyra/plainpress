const gulp = require('gulp')
const sass = require('gulp-sass')
const browserify = require('browserify')
const babelify = require('babelify')
const watchify = require('watchify')
const source = require('vinyl-source-stream')
const bufferifyify = require('vinyl-buffer')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const argv = require('yargs').argv
const livereload = require('gulp-livereload')
const uglify = require('gulp-uglify')
const gulpif = require('gulp-if')
const autoprefixer = require('gulp-autoprefixer')
const gutil = require('gulp-util')

const dev = !argv.production ? true : false

gulp.task('bundle', () => {
  const bundler = browserify({
    cache: {},
    packageCache: {},
    entries: ['./resources/js/app.js'],
    debug: dev
  })

  bundler.transform(babelify, {presets: ['es2015', 'stage-0']})

  if (dev) bundler = watchify(bundler)

  bundler.on('update', bundle)

  function bundle() {
    return bundler
      .bundle()
      .on('error', (err) => {
        gutil.log(
          gutil.colors.red('Browserify compile error: '),
          err.toString()
        )
      })
      .pipe(source('./resources/js/app.js'))
      .pipe(bufferifyify())
      .pipe(gulpif(!dev, uglify()))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('./assets/js/'))
      .pipe(gulpif(dev, livereload()))
  }

  bundle()
})

gulp.task('sass', () => {
  gulp.src('./resources/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: dev ? 'nested' : 'compressed'
    }).on('error', sass.logError))
	.pipe(autoprefixer({ browsers: ['last 3 versions','> 1%'] }))
    .pipe(gulpif(dev, sourcemaps.write()))
    .pipe(gulp.dest('./assets/css'))
    .pipe(gulpif(dev, livereload()))
})

gulp.task('watch', () => {
  livereload.listen()
  gulp.watch('./resources/scss/**/*.scss', ['sass'])
  gulp.watch(['./**/*.php'], () => {
    livereload.reload()
  })
})

gulp.task('copyfonts', function() {
   gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}')
   .pipe(gulp.dest('./assets/fonts'))
})

gulp.task('compile', ['bundle', 'sass'])
gulp.task('default', ['compile', 'watch'])
