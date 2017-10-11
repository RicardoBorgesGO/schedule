/**
 * Created by ricardo on 04/04/17.
 */
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var ENV = 'development';

//TODO refatorar no bundle
var modules = [
    'app/app.js',
    'app/**/*.module.js',
    'app/**/*.filter.js',
    'app/**/*.service.js',
    'app/**/*.directive.js',
    'app/**/*.controller.js',
    'app/**/*.component.js',
    'app/**/*.html',
    'app/js/doc_definition.js',
    'app/js/utils.js',
    'app/core/core.module.js',
    'app/data/images64.js'
];

// Static server Browser-sync
gulp.task('serve', ['vendor', 'bundle'],function() {
    browserSync.init({
        port: 8000,
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(modules, ['bundle']).on('change', browserSync.reload);
});

//Generate vendor
gulp.task('vendor', function() {
    gulp.src([
        'bower_components/moment/moment.js',
        'bower_components/pdfmake/build/pdfmake.min.js',
        'bower_components/pdfmake/build/vfs_fonts.js',
        'bower_components/pdfmake/build/pdfmake.min.js',
        'bower_components/pdfmake/build/vfs_fonts.js',
        'bower_components/angular/angular.min.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/angular-aria/angular-aria.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-material/angular-material.js',
        'bower_components/angular-material-data-table/dist/md-data-table.min.js',
        'bower_components/ng-lodash/build/ng-lodash.min.js',
        'bower_components/angular-sanitize/angular-sanitize.min.js',
        'bower_components/ng-csv/build/ng-csv.min.js',
        'bower_components/firebase/firebase.js',
        'bower_components/angularfire/dist/angularfire.min.js',
        'bower_components/md-date-range-picker/dist/md-date-range-picker.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/js/'));
});

//Generate bundle
gulp.task('bundle', function() {
    gulp.src([
        'config/' + ENV + '.js',
        'app/app.js',
        'app/**/*.module.js',
        'app/**/*.filter.js',
        'app/**/*.service.js',
        'app/**/*.directive.js',
        'app/**/*.controller.js',
        'app/**/*.component.js',
        'app/core/core.module.js',
        'app/js/doc_definition.js',
        'app/js/utils.js',
        'app/data/images64.js'
    ])
    .pipe(concat('bundle.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./public/js/'));
});