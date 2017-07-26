var express = require('express');
var router = express.Router();
var upload = require("../modules/fileupload");
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


    // var des_file = __dirname + "/" + req.file[0].originalname;
    //     fs.readFile( req.files[0].path, function (err, data) {
    //         fs.readFile(des_file, data, function (err) {
    //             if(err){
    //                 console.log(err)
    //             }else{
    //                 res = {
    //                     message: 'File uploaded successfully',
    //                     filename: req.files[0].originalname
    //                 };
    //             }
    //             console.log(res);
    //             res.end( JSON.stringify(res));
    //         });
    //     });
//});

module.exports = router;