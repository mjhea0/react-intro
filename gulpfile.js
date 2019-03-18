const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

gulp.task('lint', (done) => {
  gulp.src([
    'gulpfile.js',
    'src/**/*.js',
    'src/**/*.jsx',
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
  done();
});

gulp.task('build', gulp.series('lint', (done) => {
  gulp.src(['src/**/*.js'])
    .pipe(babel({ presets: ['@babel/preset-env', '@babel/preset-react'] }))
    .pipe(gulp.dest('lib'));
  done();
}));
