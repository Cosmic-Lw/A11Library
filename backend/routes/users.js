var express = require('express');
var router = express.Router();
const createError = require('../modules/error')
const sql = require('mysql').createPool(sql_config)

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/login', function(req, res, next) {
    if (!(req.body.username && req.body.password)) {
        next(createError("用户名或密码没有输入", 400, "用户名或密码没有输入"));
    } else {
        const username = req.body.username;
        const password = req.body.password;
        const queryStr = `select username, password, name from account where username = ? and password = ?`;
        inputs = [username, password];
        sql.query(queryStr, function(error, results) {
            if (error) {
                next(error);
            } else {
                if (!results) {
                    res.json({ logined: 0 });
                } else {
                    req.session.name = name;
                    req.session.username = username;
                    req.session.password = password;
                    res.json({ logined: 1, name: results[0].name, username: username });
                }
            }
        });
    }
});
router.post('/register', function(req, res, next) {

});

module.exports = router;