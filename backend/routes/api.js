var express = require('express');
var router = express.Router();
const sql_config = require("../modules/sql_config");
const sql = require('mysql').createPool(sql_config)

//测试样式
router.get('/starter', function(req, res, next) {
    req.session.title = '标题';
    console.log(req.session.title)
    res.json({ 'title': '标题', "description": '内容' });
});

router.get('/ceshishujuku', function(req, res, next) {
    const queryStr = `select id, content from ceshi`;
    console.log(req.session.title)
    sql.query(queryStr, function(error, results) {
        if (error) {
            next(error);
        } else {
            if (results.length === 0) {
                res.json({ ceshi: 0 })
            } else {
                res.json(results)
                console.log(results)
            }
        }
    })
});

module.exports = router;