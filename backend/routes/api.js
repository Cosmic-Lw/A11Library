var express = require('express');
var router = express.Router();

//测试样式
router.get('/Starter', function(req, res, next) {
    res.json({ 'title': '标题', "description": '内容' });
});

module.exports = router;