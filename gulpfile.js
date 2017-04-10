var gulp = require('gulp');
var child = require('child_process');
var mongoData = require('gulp-mongodb-data');


//**TASKS TO USE**
gulp.task('start', ['mongo', 'app', 'server']);
gulp.task('start-fresh', ['init-db', 'app', 'server']);
gulp.task('start-server', ['server']);

// start the application
gulp.task('app', function(){
  const args = ['start'];
  child.spawn('npm', args)
});

//adds all the test collections to a freshly cleaned db
gulp.task('init-db', ['clean-db', 'mongo'], function() {
  gulp.src('./test_data/*.json')
    .pipe(mongoData({ mongoUrl: 'mongodb://localhost:4201/tutorial-builder' }));
});

//deletes all collections in lt database
gulp.task('clean-db', ['mongo'], function(cb) {
  child.exec('mongo --port 4201 tutorial-builder --eval "db.dropDatabase()"', function(err, stdin, stderr) {
    console.log('clean-db: ', stdin);
    console.log('clean-db: ', stderr);
    cb(err);
  })
});

//starts the server
gulp.task('server', ['mongo'], function(cb) {
  const args = ['app.js'];
  const options = {stdio: 'inherit'};
  child.spawn('node', args, options);
  cb();
});

//starts the mongod instance
gulp.task('mongo', function() {
  child.exec('mongod --port 4201 --dbpath ./db', function(err, stdin, stderr) {
    console.log('mongo: ', stdin);
    console.log('mongo: ', stderr);
  });
});
