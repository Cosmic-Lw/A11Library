var express = require('express');
var path = require('path');
var session = require('express-session');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//原始文件
//var index = require('./routes/index');
/**
 *  登录控制的api
 */
var users = require('./routes/users');
/**
 * 路由文件控制 测试控制
 */
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//使用express-session
app.use(session({
    secret: 'zhanglublog', //secret的值建议使用随机字符串
    cookie: { maxAge: 60 * 1000 * 30 },  // 过期时间（毫秒）
    resave: true,
    saveUninitialized: true
}));
//使用路由
// app.use('/', index);

app.use('/user', users);
/**
 * 使用路由
 */
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;