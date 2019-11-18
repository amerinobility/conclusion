var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var index = require('./routes/index');
var session = require('express-session');
var mysql=require('./mysql');
var Geetest = require('./gt-sdk');
var app = express();
app.use(compression());
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true
}));

// pc 端接口

var captcha1 = new Geetest({
    geetest_id: '6216680937717fdab947ed9e71a3aaa1',
    geetest_key: '0f7e44a231f89b91ff2a5f75069c4f86'
});
app.get("/gt/register1", function (req, res) {
    // 向极验申请每次验证所需的challenge
    captcha1.register({
        client_type: 'unknown',
        ip_address: 'unknown'
    }, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            req.session.fallback = true;
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            req.session.fallback = false;
            res.send(data);
        }
    });
});

app.post("/gt/form-validate1", function (req, res) {

    // 对form表单提供的验证凭证进行验证
    captcha1.validate(req.session.fallback, {
        geetest_challenge: req.body.geetest_challenge,
        geetest_validate: req.body.geetest_validate,
        geetest_seccode: req.body.geetest_seccode

    }, function (err, success) {
         username2=req.body.username2;
         password2=req.body.password2;
         sex=req.body.sex;
         name=req.body.name;
       mysql.userAdd(username2,password2,sex,name).then(function(result){
            if (err) {
            // 网络错误
            res.send({
                status: "error",
                info: err
            });
        } else if (!success || !result) {
            // 二次验证失败
            res.send({
                status: "fail",
                info: '注册失败'
            });
        } else {
             res.send({
                status: "success",
                info: '注册成功'
            });     
        }
    });

    });
});
var captcha2 = new Geetest({
    geetest_id: '1eed608f8c6005eefe381da924dd9115',
    geetest_key: 'a206bb2076f02b4d7d0f4a62fd7799d9'
});

app.get("/gt/register2", function (req, res) {

    // 向极验申请每次验证所需的challenge
    captcha2.register({
        client_type: 'unknown',
        ip_address: 'unknown'
    }, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            req.session.fallback = true;
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            req.session.fallback = false;
            res.send(data);
        }
    });
});

app.post("/gt/ajax-validate2", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    captcha2.validate(req.session.fallback, {

        geetest_challenge: req.body.geetest_challenge,
        geetest_validate: req.body.geetest_validate,
        geetest_seccode: req.body.geetest_seccode

    }, function (err, success) {
        username=req.body.username;
        password=req.body.password;
        if (username.length>=10 && username.length<=14) {
            mysql.userSelect(username,password).then(function(result){
            if (err) {
            // 网络错误
            res.send({
                status: "error",
                info: err
            });

        } else if (!success || !result.length) {
            // 二次验证失败
            res.send({
                status: "fail",
                info: '登录失败'
            });
        } else {
                req.session.name=result[0].name;
                req.session.usernameID=result[0].usernameID;
                req.session.companyID=result[0].companyID;
             res.send({
                status: "success",
                info: '登录成功',
                name:result[0].username
            });     
        }
    });
        }else{
            res.send({
                status: "error",
                info: '请检查用户名长度'
            });  
        }
    });
});

var captcha3 = new Geetest({
    geetest_id: '6216680937717fdab947ed9e71a3aaa1',
    geetest_key: '0f7e44a231f89b91ff2a5f75069c4f86'
});
app.get("/gt/register3", function (req, res) {
    // 向极验申请每次验证所需的challenge
    captcha3.register({
        client_type: 'unknown',
        ip_address: 'unknown'
    }, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            req.session.fallback = true;
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            req.session.fallback = false;
            res.send(data);
        }
    });
});

app.post("/gt/form-validate3", function (req, res) {

    // 对form表单提供的验证凭证进行验证
    captcha3.validate(req.session.fallback, {
        geetest_challenge: req.body.geetest_challenge,
        geetest_validate: req.body.geetest_validate,
        geetest_seccode: req.body.geetest_seccode

    }, function (err, success) {
         username2=req.body.username2;
         password2=req.body.password2;
         name=req.body.name
       mysql.companyAdd(username2,password2,name).then(function(result){
        console.log(result)
            if (err) {

            // 网络错误
            res.send({
                status: "error",
                info: err
            });

        } else if (!success || !result) {
            // 二次验证失败
            res.send({
                status: "fail",
                info: '注册失败'
            });
        } else {
             res.send({
                status: "success",
                info: '注册成功'
            });     
        }
    });

    });
});

app.use(index);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   // res.render('error');
// });

module.exports = app;
