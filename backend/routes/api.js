var express = require('express');
var router = express.Router();
const sql_config = require("../modules/sql_config");
const sql = require('mysql').createPool(sql_config)

//测试样式
router.get('/Starter', function(req, res, next) {
    res.session.title = '标题';
    res.json({ 'title': '标题', "description": '内容' });
});

router.get('/ceshishujuku', function(req, res, next) {
    const queryStr = `select id, content from ceshi`;
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