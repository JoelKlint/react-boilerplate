var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {
	browserify('src/js/index.jsx')
	.transform('babelify', {presets: ['es2015', 'react']})
	.bundle()
	.on('error', function(err) {
		console.log('Error: ' + err.message);
	})
	.pipe(source('index.js'))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function() {
	gulp.src('src/index.html')
	.pipe(gulp.dest('dist'));

	gulp.src('src/css/**')
	.pipe(gulp.dest('dist/css'));

	gulp.src('assets/**/**')
	.pipe(gulp.dest('dist/assets'));
});

gulp.task('default', ['browserify', 'copy']);

gulp.watch('src/**/**/*', ['default']);
