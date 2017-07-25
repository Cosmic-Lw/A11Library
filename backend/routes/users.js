var express = require('express');
var router = express.Router();
const sql_config = require('../modules/sql_config');
const createError = require('../modules/error');
const sql = require('mysql').createPool(sql_config);

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/login', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/login', function(req, res, next) {
    if (!(req.body.username && req.body.password)) {
        next(createError("用户名或密码没有输入", 400, "用户名或密码没有输入"));
        return;
    } else {
        const username = req.body.username;
        const password = req.body.password;
        console.log(username)
        console.log(password)
        const queryStr = `select username, password, name from account where username = ? and password = ?`;
        inputs = [username, password];
        sql.query(queryStr, inputs, function(error, results) {
            if (error) {
                next(error);
            } else {
                console.log(results)
                if (!results[0].username) {
                    res.json({ logined: 0 });
                } else {
                    req.session.username = results[0].username;
                    req.session.name = results[0].name;
                    req.session.password = results[0].password;
                    res.json({ logined: 1, username: results[0].username, password: results[0].password });
                }
            }
        });
    }
});
router.post('/register', function(req, res, next) {
    if(req.body.username&&req.body.password)
    {
        next(createError("用户名或密码没有输入", 400, "用户名或密码没有输入"));
        return;
    }
    console.log(username)
    console.log(password)
    const queryStr = `select username from account where username = ?`;
    inputs = [username];
    sql.query(queryStr, inputs, function(error, results) {
        if (error) {
            next(error);
        } else {
            console.log(results)
            if (results[0].username) {
                res.json({ registed: 1 });
            } else {
                const insertaccount = `insert into `
                res.json({ registed: 1, username: results[0].username, password: results[0].password });
                }
            }
    });
});

module.exports = router;