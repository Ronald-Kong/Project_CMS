const Koa=require("koa2");
const Router=require("koa-router")
const {query, returnMsg,jwtVerify}=require("../../utils")
const jwt = require('jsonwebtoken');
const router=new Router()


router.put("/",async (ctx)=>{
    const token=ctx.request.headers.token;

    if(!jwtVerify(token))
    {
        ctx.body=returnMsg(2,"用户信息获取失败","token过期或不存在")
        return
    }

    const {username}=ctx.request.body;


    let exist=await new Promise((resolve,reject)=>{
        query(`select * from user where username="${username}"`,(err,data)=>{
            if(err)
            reject;
            resolve(data)
        })
    })

    const new_editable=1-exist[0].editable;

    let res=await new Promise((resolve,reject)=>{
        query(`update user set editable=${new_editable} where username="${username}"`,(err,data)=>{
            if(err)
            reject;
            resolve(data)
        })
    })
    ctx.body=returnMsg(0,"权限修改成功","权限修改成功");
})

module.exports=router;