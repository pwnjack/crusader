'use strict';

var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	wiredep = require('wiredep').stream,
	del = require('del'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

// var config = require('./config.json');

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
	.pipe(gulp.dest('app/.tmp'))
	.pipe(reload({stream:true}));
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/scripts/**/*.js', '!app/scripts/plugins/modernizr.js'
	])
	.pipe($.order([
		"plugins/*.js",
		"main.js"
	]))
	.pipe($.jshint())
	.pipe($.jshint.reporter('jshint-stylish'))
	.pipe($.concat('main.js'))
	.pipe(gulp.dest('app/.tmp'))
	.pipe(reload({stream:true}));
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

gulp.task('views', function() {
	return gulp.src([
		'app/views/*.jade',
		'!app/views/master.jade',
		'!app/views/partials/*.jade'
	])
	.pipe($.changed('app', {extension: '.html'}))
	.pipe($.plumber())
	.pipe($.jade({
		pretty: true
	}))
	.pipe(gulp.dest('app'))
	.pipe(reload({stream:true}));
});

gulp.task('wiredep', function () {
  gulp.src('app/views/master.jade')
    .pipe(wiredep({ignorePath: '../'}))
    .pipe(gulp.dest('app/views'));
});

gulp.task('start', ['wiredep'], function() {
	gulp.start('styles', 'scripts', 'views');
});

gulp.task('clean', function(cb) {
	del(['dist', 'app/.tmp', 'app/*.html'], cb)
});

gulp.task('deploy', ['views'], function () {
	var gulpif = require('gulp-if'),
		assets = $.useref.assets();
	return gulp.src('app/*.html')
	.pipe(assets)
	.pipe(gulpif('*.js', $.uglify()))
	.pipe(gulpif('*.css', $.cssnano()))
	.pipe(assets.restore())
	.pipe($.useref())
	.pipe(gulp.dest('dist'));
});

gulp.task('build', ['start'], function() {
	gulp.start('deploy', 'images', 'fonts', 'extra');
});

gulp.task('watch', function() {
	gulp.watch('app/views/**/*.jade', ['views']);
	gulp.watch('app/styles/**/*.scss', ['styles']);
	gulp.watch('app/scripts/**/*.js', ['scripts']);
});

gulp.task('serve', ['watch'], function() {
	browserSync({
		server: {
			baseDir: 'app'
		}
	});
	gulp.watch([
		'*.html',
		'.tmp/main.css',
		'.tmp/main.js'
	], {cwd: 'app'}, reload);
});

gulp.task('default', ['clean', 'start', 'serve']);
