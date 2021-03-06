var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var partials = require('express-partials'); //fase modulo-6 quiz-4 paso 2
var methodOverride = require('method-override');
var session = require('express-session');
var routes = require('./routes/index');
//var users = require('./routes/users');-eliminado-pag27

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials()); //fase modulo-6 quiz-4 paso 2

 //uncomment after placing your favicon in /public
 //app.use(favicon(__dirname + '/public/favicon.ico')); 
   app.use(favicon(__dirname + '/public/favicon.ico')); //añadido para el fichero favicon-pag 28
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));  // true añadido consejo foro { extended: false }));
//app.use(cookieParser());
app.use(cookieParser('Quiz 2015'));
app.use(session({
  secret:'Quiz 2015',
  resave:true,
  saveUninitialized:true
}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


//Helpers dinámicos
app.use(function(req,res,next){
  //guardar path en session.redir para después de login
  if(!req.path.match(/\/login|\/logout/)){
    req.session.redir = req.path;
  }
  //Hacer visible req.session en las vistas
  res.locals.session = req.session;
  next();
});

app.use(function (req, res, next) {
    if (!req.path.match(/\/login|\/logout/)) {
        if (req.session.user) {
            var currentDate = new Date().getTime();
            var lastAccess = req.session.user.lastAccess || currentDate;
            var expire = currentDate - (2 * 60 * 1000);
            if (lastAccess < expire) {
                var sessionController = require('./controllers/session_controller');
                sessionController.destroy(req, res, next);
                return;
            }
            req.session.user.lastAccess = currentDate;
        }
    }
    res.locals.session = req.session;
    next();
})

app.use('/', routes);
//app.use('/users', users);-borrado pag27

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors: []
    });
});


module.exports = app;
