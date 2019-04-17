var gulp = require('gulp');
var bundle = require('./tasks/bundle');

gulp.task("bundle", bundle.build);
gulp.task("watch", bundle.watch);

gulp.task("default", gulp.parallel("bundle"));