'use strict';

var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	wiredep = require('wiredep').stream,
	del = require('del'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

// Development

gulp.task('styles', function() {
	return gulp.src('app/styles/style.scss')
	.pipe($.sourcemaps.init())
	.pipe($.sass().on('error', $.sass.logError))
	.pipe($.autoprefixer(
		'last 5 version',
		'safari 5',
		'ie 8',
		'ie 9',
		'opera 12.1',
		'ios 6',
		'android 4'
	))
	.pipe($.sourcemaps.write())
	.pipe(gulp.dest('app/.tmp/'))
	.pipe(reload({stream:true}));
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/scripts/**/*.js', '!app/scripts/plugins/modernizr.js'
	])
	.pipe($.sourcemaps.init())
	.pipe($.order([
		"plugins/*.js",
		"main.js"
	]))
	.pipe($.concat('main.js'))
	.pipe($.sourcemaps.write())
	.pipe($.jshint())
	.pipe($.jshint.reporter('jshint-stylish'))
	.pipe(gulp.dest('app/.tmp/'))
	.pipe(reload({stream:true}));
});

gulp.task('views', function() {
	return gulp.src('app/views/*.pug')
	.pipe($.plumber())
	.pipe($.pug({
		pretty: true
	}))
	.pipe(gulp.dest('app/'))
	.pipe(reload({stream:true}));
});

gulp.task('clean', function(cb) {
	del(['dist/', 'app/.tmp', 'app/*.html'], cb)
});


// Local preview server

gulp.task('watch', function() {
	browserSync({
		server: {
			baseDir: 'app'
		}
	});
	gulp.watch('app/views/**/*.pug', ['views']);
	gulp.watch('app/styles/**/*.scss', ['styles']);
	gulp.watch('app/scripts/**/*.js', ['scripts']);
	gulp.watch([
		'*.html',
		'.tmp/main.css',
		'.tmp/main.js'
	], {cwd: 'app'}, reload);
});

gulp.task('default', ['styles', 'scripts', 'views', 'watch']);


// Wire-up assets

gulp.task('wiredep', function () {
  gulp.src('app/views/partials/master.pug')
    .pipe(wiredep({ignorePath: '../../'}))
    .pipe(gulp.dest('app/views/partials/'));
});


// Build for production

gulp.task('deploy', function() {
	var gulpif = require('gulp-if');
	return gulp.src('app/*.html')
	.pipe($.useref())
	.pipe(gulpif('*.js', $.uglify()))
    .pipe(gulpif('*.css', $.cssnano()))
    .pipe(gulpif('*.html', $.htmlmin({collapseWhitespace: true})))
	.pipe(gulp.dest('dist/'))
});

gulp.task('fonts', function() {
	// return gulp.src(config.vendorFiles.fonts)
	// .pipe(gulp.dest('dist/fonts'))
	return gulp.src([
		'app/**/fonts/*.eot',
		'app/**/fonts/*.woff',
		'app/**/fonts/*.woff2',
		'app/**/fonts/*.svg',
		'app/**/fonts/*.ttf'
	])
	.pipe($.flatten())
	.pipe(gulp.dest('dist/fonts'))
});


gulp.task('clear_cache', function (done) {
	return $.cache.clearAll(done);
});
gulp.task('images', ['clear_cache'], function() {
	// return gulp.src(config.vendorFiles.images)
	// .pipe(gulp.dest('dist/images'))
	return gulp.src('app/images/*')
	.pipe($.cache($.imagemin({
		optimizationLevel: 3,
		progressive: true,
		interlaced: true
	})))
	.pipe(gulp.dest('dist/images'))
});

gulp.task('extra', function() {
	return gulp.src([
		'app/**/*.*',
		'!app/*.html',
		'!app/bower_components/**',
		'!app/scripts/**',
		'!app/styles/**',
		'!app/images/**',
		'!app/views/**',
		'!app/.tmp/**',
		'!app/.tmp'
	], { dot: true })
	.pipe(gulp.dest('dist'))
});

gulp.task('build', ['styles', 'scripts', 'views'], function() {
	gulp.start('deploy', 'fonts', 'images', 'extra');
});
