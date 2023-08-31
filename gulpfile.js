const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// Задача для компіляції та мінімізації SCSS файлів
gulp.task('sass', () => {
return gulp.src('src/sass/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(concat('sass.min.css'))
    .pipe(gulp.dest('dist/css'));
});

// Задача для конкатенації та мінімізації JS файлів
gulp.task('scripts', () => {
return gulp.src('src/scripts/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Задача за замовчуванням
gulp.task('default', gulp.series('sass', 'scripts'));

// Запуск задач при зміні файлів
gulp.task('watch', () => {
gulp.watch('src/sass/*.scss', gulp.series('sass'));
gulp.watch('src/scripts/*.js', gulp.series('scripts'));
});
