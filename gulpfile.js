var gulp = require('gulp'),
	autoprefixer = require('autoprefixer'),
	browserSync = require('browser-sync').create(),
	image = require('gulp-image'),
	jshint = require('gulp-jshint'),
	postcss = require('gulp-postcss'),
	ejs = require( 'gulp-ejs' ),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleanCss = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),

	root = 'dist/',
	app = 'app/',
	scss = app + 'sass/',
	css = root + 'css/',
	js = root + 'js/',
	img = root + 'images/',
	ejsSrc = app + 'views/',
	html = root + 'html/';

// scss + css
gulp.task('css', function() {
	return gulp.src([scss + '*.scss'])
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'expanded', 
		indentType: 'tab',
		indentWidth: '1'
	}).on('error', sass.logError))
	.pipe(postcss([
		autoprefixer('last 2 versions', '> 1%')
	]))
	.pipe(sourcemaps.write('maps'))
	.pipe(gulp.dest(css));
});

// minify css
gulp.task('cssmin', function() {
	return gulp.src([css + '*.css'])
	.pipe(cleanCss() )
	.pipe(rename({ 
		suffix: '.min' 
	}) )
	.pipe(gulp.dest(css));
});

// javascript
gulp.task('javascript', function() {
	return gulp.src([js + '*.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(gulp.dest(js));
});

// contactjs
gulp.task('contactjs', function() {
	return gulp.src([js + 'navigation.js', js + 'validate.js', js + 'form_validate.js'])
	.pipe(concat( 'contact.js' ) )
	.pipe(gulp.dest(js))
	.pipe(uglify() )
	.pipe(gulp.dest(js));
});

// indexjs
gulp.task('indexjs', function() {
	return gulp.src([js + 'lightbox.js', js + 'navigation.js', js + 'clock.js', js + 'socialshare.js'])
	.pipe(concat( 'index.js' ) )
	.pipe(gulp.dest(js))
	.pipe(uglify() )
	.pipe(gulp.dest(js));
});

// ejs 
gulp.task('ejs', function() {
  return gulp.src([ejsSrc + '*.ejs'])
	.pipe(ejs({},{}, {ext:'.html'}))
	.pipe(gulp.dest(root))
});

// html 
gulp.task('html', function() {
  return gulp.src(['html + *.html'])
});

// watch everything 
gulp.task('watch', function() {
	browserSync.init({ 
		open: 'external',
		server: {
            baseDir: root
        },
		port: 8080
	});
	gulp.watch([css + '*.css', scss + '*.scss' ], ['css']);
	gulp.watch([css + '*.css', scss + '*.scss' ], ['cssmin']);
	gulp.watch(js + '*.js', ['javascript']);
	gulp.watch([ejsSrc + '*.ejs,', ejsSrc + '**/**/*.ejs' ], ['ejs']);
	gulp.watch([root + '**/*', root + '*', app + '**/*']).on('change', browserSync.reload);
});

// Default task (runs at initiation: gulp --verbose)
gulp.task('default', ['watch']);