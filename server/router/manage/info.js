const Koa=require("koa2");
const Router=require("koa-router")
const {query, returnMsg,jwtVerify}=require("../../utils")
const jwt = require('jsonwebtoken');
const router=new Router()

router.get("/",async (ctx)=>{
    const token=ctx.request.headers.token;

    if(!jwtVerify(token))
    {
        ctx.body=returnMsg(2,"用户信息获取失败","token过期或不存在")
        return
    }

    let res=await new Promise((resolve,reject)=>{
        query(`select * from user where token="${token}"`,(err,data)=>{
            if(err)
            reject;
            resolve(data)
        })
    })
    ctx.body=returnMsg(0,"获取用户信息成功",res[0]);
})

router.put("/",async (ctx)=>{
    const token=ctx.request.headers.token;

    if(!jwtVerify(token))
    {
        ctx.body=returnMsg(2,"用户信息获取失败","token过期或不存在")
        return
    }

    const {username,password}=ctx.request.body;


    let exist=await new Promise((resolve,reject)=>{
        query(`select * from user where username="${username}"`,(err,data)=>{
            if(err)
            reject;
            resolve(data)
        })
    })


    if(exist.length!==0&&exist[0].token!==token)
    {
        ctx.body=returnMsg(2,"已存在该用户名","已存在该用户名")
        return;
    }

    let res=await new Promise((resolve,reject)=>{
        query(`update user set username="${username}",password="${password}" where token="${token}"`,(err,data)=>{
            if(err)
            reject;
            resolve(data)
        })
    })
    ctx.body=returnMsg(0,"修改用户名或密码成功","修改用户名或密码成功");
})

module.exports=router;