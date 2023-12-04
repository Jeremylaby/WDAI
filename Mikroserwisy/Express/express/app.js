var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var models = require("./db")

models.sequelize.sync({ force: true })
    .then(() => {
      console.log('Database & tables created successfully');

      return models.PersonSchema.create({
        name: 'Stanisław',
        surname: 'Barycki',
        job: 'It'
      });
    })
models.sequelize.sync({ force: true })
    .then(() => {
        console.log('Database & tables created successfully');
        return models.PersonSchema.create({
            name: 'Grzes',
            surname: 'Barycki',
            job: 'Student'
        });

    })
models.sequelize.sync({ force: true })
    .then(() => {
        return models.PersonSchema.create({
            name: 'Michal',
            surname: 'Barycki',
            job: 'Economy'
        });
    })
    .then(() => {
      console.log('Person created successfully');
    })
    .catch((error) => {
      console.error('Error during table creation:', error);
    });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var helloRouter = require('./routes/hello');
var personRouter = require('./routes/person');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.use('/users', usersRouter);
app.use('/hello', helloRouter);
app.use('/person', personRouter);

app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
