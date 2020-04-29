const gulp = require("gulp");
const zip = require("gulp-zip");
const copy = require("gulp-copy");
const child_process = require("child_process");
const clean = require('gulp-clean');
const merge = require("merge-stream");

const exec = (command, cb) => {
    child_process.exec(command, (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    })
};

gulp.task('clean', function () {
    return gulp.src(['dist', 'bin'], {read: false, allowEmpty: true})
        .pipe(clean());
});

gulp.task("build", (cb) => {
    exec('tsc', cb);
});

const configFiles = ['.env', 'package.json', 'package-lock.json'];
gulp.task("copy-config", () => {
    return gulp.src(configFiles)
        .pipe(copy('bin/'));
});

gulp.task("zip", () => {
    return merge(gulp.src("bin/**/*", {dot: true}), gulp.src("node_modules/**/*", {base: ".", dot: true}))
        .pipe(zip('lambda.zip'))
        .pipe(gulp.dest('dist/'))
});

gulp.task('default', gulp.series('clean', 'build', 'copy-config', 'zip'));
