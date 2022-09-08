const mysql = require("mysql");
const jwt = require('jsonwebtoken');

let host="http://127.0.0.1"

let port="9000"

const pool = mysql.createPool({
    host: "localhost",  // 连接的服务器(代码托管到线上后，需改为内网IP，而非外网)
    port: 3306, // mysql服务运行的端口
    database: "cms", // 选择某个数据库
    user: "root",   // 用户名
    password: "kfz19990203", // 用户密码
})

//对数据库进行增删改查操作的基础
let query = (sql,callback) => {
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            callback(err,rows)
            connection.release()
        })
    })
}

let returnMsg=(errCode,message,data)=>{
    return {
        errCode,
        message,
        data
    }
}

let jwtVerify=(token)=>{
    try{
        jwt.verify(token,'kfz')
    }catch(err){
        return false
    }

    return true;
}

module.exports={
    host,port,query,returnMsg,jwtVerify
}