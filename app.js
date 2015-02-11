var express = require('express');
var http = require('http');
var hbs = require('hbs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', hbs.__express);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

mongoose.connect('mongodb://localhost/DealManthan');

var userSchema = new mongoose.Schema({
    _id : String,
    name : String,
    email : String,
    password : String
});

var user = mongoose.model('users', userSchema);

app.post('/signup', function(req, res){
    new user({
        _id : req.body.email,
        name : req.body.username,
        email : req.body.email,
        password : req.body.password                
    }).save(function(err, doc){
        if(err) res.redirect('/user_already_exists.html');
        else    res.redirect('/index.html');
    });
});

app.post('/signin', function(req, res){
    user.find({'_id' : req.body.email,'password' : req.body.password}, function(err, docs){
        if(err) {
            console.log("******************Error***********");
        }
        else {
            console.log("******************Document Length***********"+docs.length);
            if(docs.length>0){
                res.redirect('/home.html');
            } else {
                res.redirect('/login_failure.html');
            }
           
        }
    });
});

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
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
//module.exports = app;
