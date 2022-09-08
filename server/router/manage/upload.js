const Koa=require("koa2");
const Router=require("koa-router")
const {query,returnMsg,jwtVerify}=require("../../utils")
const fs = require("fs");
const multer = require('@koa/multer');//加载@koa/multer模块
const path = require("path")
const jwt = require('jsonwebtoken');
const login=require("./login")
const register=require("./register")
const info=require("./info")
const router=new Router()

let myfilename = "";    // 返回给前端的文件名

// 创建存放头像图片的目录(当头像目录不存在时)
fs.readdir(__dirname + "/images/", function (err, files) {
    if (err) {
        fs.mkdir(__dirname + "/images/", function (err) {
            if (err) {
                console.log(err)
            }
            console.log("目录创建成功。");
        })
    }
})

var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname ,'/images/'))
    },
    //修改文件名称
    filename: function (req, file, cb) {
        let type = file.originalname.split('.')[1]
        // logo.png -> logo.xxx.png
        myfilename = `${file.fieldname}-${Date.now().toString(16)}.${type}`
        cb(null, myfilename)
    }
})

//文件上传限制
const limits = {
    fields: 10,//非文件字段的数量
    fileSize: 200 * 1024,//文件大小 单位 b
    files: 1//文件数量
}
const upload = multer({storage,limits})

router.post('/', upload.single('avatar'), async ctx => {
    // 当前接口允许跨域
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    // 获取文件
    // console.log(ctx.req.file);

    // 验证token
    let token = ctx.request.headers["token"];

    if(!jwtVerify(token))
    {
        ctx.body=returnMsg(2,"用户信息获取失败","token过期或不存在")
        return
    }


    
    let result = await new Promise((resolve, reject) => {
        // 获取token对应的用户
        const sql = `UPDATE user SET avatar='${myfilename}' WHERE token='${token}'`;
        query(sql, (err, data) => {
            if (err) reject(err);
            resolve(true);
        })
    })

    if(result){
        ctx.body = returnMsg(0, '图片上传成功', {
            // 要求前端自行补全域名
            filePath: `${myfilename}`
        })
    }else{
        ctx.body = returnMsg(1, '操作失败请重试');
    }
    
})

module.exports=router;
