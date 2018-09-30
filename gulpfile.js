const gulp      = require('gulp');
const imgResize = require('gulp-responsive');
const clean     = require('gulp-clean');
const concat    = require('gulp-concat');
const flatten   = require('gulp-flatten');
const zip       = require('gulp-zip');

const SKIN_PATH = 'D:/Games/osu!/Skins/Breeze-v2.0';

gulp.task('clean', function(){
  return gulp.src(['Build/*','Out/*']).pipe(clean());
});

gulp.task('retina',function(){
  return gulp.src('Source/**/*.{jpg,png}')
    .pipe(imgResize({
      '**/*': [{
        rename: file => { file.basename += '@2x'; return file }
      },{
        width:  '50%',
        height: '50%'
      }]
    }))
    .pipe(gulp.dest('Build'));
});

gulp.task('config', function(){
  return gulp.src('Source/**/*.ini')
    .pipe(concat('skin.ini'))
    .pipe(gulp.dest('Build'));
});

gulp.task('flatten',function(){
  return gulp.src('Build/**/*')
    .pipe(flatten())
    .pipe(gulp.dest('Out'));
});

gulp.task('zip',function(){
  return gulp.src('Out/**/*').pipe(zip('Breeze-v2.0.osk')).pipe(gulp.dest('./'));
})

gulp.task('install-clean',function(){
  return gulp.src(SKIN_PATH + '/*').pipe(clean());
});

gulp.task('install',gulp.series('install-clean',function(){
  return gulp.src('Out/**/*').pipe(gulp.dest(SKIN_PATH))
}));

gulp.task('default', gulp.series('clean','retina','config','flatten','zip'));
gulp.task('watch-install', () => {
  return gulp.watch('Source/**/*',gulp.series('default','install'));
});
