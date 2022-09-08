const Koa=require("koa2");
const Router=require("koa-router")
const {query,returnMsg}=require("../../utils")
const jwt=require("jsonwebtoken")
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
        if(res.length!==0)
        {
            ctx.body=returnMsg(1,"注册失败","已存在该用户名")
        }
        else
        {
            await new Promise((resolve,reject)=>{
                query(`insert into user values(null,"${username}","${password}",null,"default_avatar.jpg","normal",1)`,(err,data)=>{
                    if(err)
                    reject;
                    resolve(data)
                })
            })
            ctx.body=returnMsg(0,"注册成功","注册成功")
        }
    }
    else
    ctx.body=returnMsg(1,"注册失败","未输入用户名或密码")
})

module.exports=router;