var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require("../modules/multerUtils"); 
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


router.post('/upload', function(req, res, next) {
    console.log("成功加载");
    var upload=muilter.single('file');       	   
      exports.dataInput = function (req, res) {
      upload(req, res, function (err) {
        //添加错误处理
    if (err) {
         return  console.log(err);
    } 
        //文件信息在req.file或者req.files中显示。
    console.log(req);
  });
 } });
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