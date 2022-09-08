const Koa=require("koa2");
const Router=require("koa-router")
const {query, returnMsg}=require("../../utils")
const jwt = require('jsonwebtoken');
const router=new Router()

router.post("/",async (ctx)=>{
    const {username,password}=ctx.request.body;
    if(username&&password)
    {   
        let res=await new Promise((resolve,reject)=>{
            query(`select * from user where username="${username}"`,(err,data)=>{
                if(err)
                reject;
                resolve(data)
            })
        })
        if(res.length===0)
        ctx.body=returnMsg(1,"登陆失败","用户不存在")
        else{
            if(res[0].password!==password)
            ctx.body=returnMsg(1,"登陆失败","密码错误")
            else
        {
            let token=jwt.sign(
                {username,password},    // 携带信息
                'kfz',          // 秘钥
                {expiresIn:'1h'}        // 有效期：1h一小时
            )

            await new Promise((resolve,reject)=>{
                query(`update user set token="${token}" where username="${username}"`,(err,data)=>{
                    if(err)
                    reject;
                    resolve(data)
                })
            })

            let res2=await new Promise((resolve,reject)=>{
                query(`select * from user where username="${username}"`,(err,data)=>{
                    if(err)
                    reject;
                    resolve(data)
                })
            })
            let obj={
                username:res2[0].username,
                avatar:res2[0].avatar,
                "token":res2[0]["token"],
                player:res2[0].player,
                editable:res2[0].editable

            }
            ctx.body=returnMsg(0,"登陆成功",obj);
        }
        }
    }

    else
    ctx.body=returnMsg(1,"登陆失败","用户名或密码为空")
})

module.exports=router;