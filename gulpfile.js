var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var packager = require('electron-packager');

var project = ts.createProject('src/tsconfig.json', {
    typescript: require('typescript')
});

gulp.task( 'build:izarra', function () {
    var result = project.src()
        .pipe(ts(project));
    return result.pipe(gulp.dest('build'))
});

gulp.task( 'clean:izarra', function () {
    del([
        'build',
        'release'
    ]);
});

gulp.task( 'copy:izarra', function() {
    gulp.src(
        ['src/html/*.html', 'src/html/css/**', 'src/html/js/*.js'],
        { base: 'src/html' }
    ).pipe( gulp.dest( 'build/html' ));
    gulp.src(
        [ 'plugin/**' ], { base: 'plugin' }
    ).pipe( gulp.dest( 'build/plugin' ) );
    gulp.src(
        [ 'package.json' ], { base: '.' }
    ).pipe( gulp.dest( 'build' ) );
});

gulp.task('package:win32:izarra', ["setup:izarra"], function (done) {
    packager({
        dir: 'build',
        out: 'release/win32',
        name: 'izarra',
        arch: 'ia32',
        platform: 'win32',
        version: '0.37.8'
    }, function (err, path) {
        done();
    });
});

gulp.task("setup:izarra", ["build:izarra", "copy:izarra"]);
gulp.task("build", ["clean:izarra", "setup:izarra"]);
gulp.task("default", ["build", "package:win32:izarra"]);
