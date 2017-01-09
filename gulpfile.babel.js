import gulp from 'gulp'
import sass from 'gulp-sass'
import browserify from 'browserify'
import babelify from 'babelify'
import watchify from 'watchify'
import source from 'vinyl-source-stream'
import bufferifyify from 'vinyl-buffer'
import rename from 'gulp-rename'
import sourcemaps from 'gulp-sourcemaps'
import { argv } from 'yargs'
import livereload from 'gulp-livereload'
import uglify from 'gulp-uglify'
import gulpif from 'gulp-if'
import autoprefixer from 'gulp-autoprefixer'
import gutil from 'gulp-util'

const dev = !argv.production ? true : false

if (!dev) {
  process.env.NODE_ENV = 'production'
}

gulp.task('bundle', () => {
  let bundler = browserify({
    cache: {},
    packageCache: {},
    entries: ['./resources/js/app.js'],
    debug: dev
  })

  bundler.transform(babelify, {
    presets: ['es2015', 'stage-0', 'es2017']
  })

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
   gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg,woff2}')
   .pipe(gulp.dest('./assets/fonts'))
})

gulp.task('compile', ['bundle', 'sass'])
gulp.task('default', ['compile', 'watch'])
