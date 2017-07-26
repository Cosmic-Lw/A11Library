var express = require('express');
var router = express.Router();
var upload = require("../modules/fileupload");
const sql_config = require("../modules/sql_config");
const sql = require('mysql').createPool(sql_config)
var sendmail = require("../modules/mail.js")
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
router.get('/upload', function(req, res, next) {
    req.session.title = '标题';
    console.log(req.session.title)
    res.json({ 'title': '标题', "description": '内容' });
});
router.post('/upload', upload.single('avatar'), function (req, res, next) {
    if (req.file) {
        console.log('文件' );
        console.log(req.file);
        res.json({'filepath': req.file.path});
        console.log(req.file.path);
        console.log(req.body);
    }
});

router.post('/sendMail', function(req, res, next){
    console.log(req.body)
    sendmail(req.body.useremail, '这是测试邮件', 'Hi,在家啊没干');
})

module.exports = router;