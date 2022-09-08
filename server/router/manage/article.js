const Koa=require("koa2");
const Router=require("koa-router")
const {query, returnMsg,jwtVerify}=require("../../utils")
const jwt = require('jsonwebtoken');
const router=new Router()
const moment=require("moment")

router.get("/",async (ctx)=>{
    // const token=ctx.request.headers.token;

    // if(!jwtVerify(token))
    // {
    //     ctx.body=returnMsg(2,"请求文章失败","token过期或不存在")
    //     return
    // }
    const {num,count}=ctx.request.query;

    let res=await new Promise((resolve,reject)=>{
        query(`select * from article`,(err,data)=>{
            if(err)
            reject;
            resolve(data)
        })
    })

    

     const data={
         num:num,
         count:count,
         arr:res,
         total:res.length
     }
    ctx.body=returnMsg(0,"获取文章信息成功",data);
})


router.post("/add",async (ctx)=>{
    // const token=ctx.request.headers.token;

    // if(!jwtVerify(token))
    // {
    //     ctx.body=returnMsg(2,"请求文章失败","token过期或不存在")
    //     return
    // }

    const {title,subTitle,content}=ctx.request.body;
    const time=moment(new Date()).format("YYYY-MM-DD HH-mm-ss")

    let res=await new Promise((resolve,reject)=>{
        query(`insert into article values(null,"${title}","${subTitle}",null,"${time}","${content}")`,(err,data)=>{
            if(err)
            reject;
            resolve(data)
        })
    })
    console.log(res)
    ctx.body=returnMsg(0,"添加文章信息成功",res);
})

router.post("/remove",async (ctx)=>{
    // const token=ctx.request.headers.token;

    // if(!jwtVerify(token))
    // {
    //     ctx.body=returnMsg(2,"请求文章失败","token过期或不存在")
    //     return
    // }

    const {id}=ctx.request.body;
    let res=await new Promise((resolve,reject)=>{
        query(`delete from article where id=${id}`,(err,data)=>{
            if(err)
            reject;
            resolve(data)
        })
    })
    ctx.body=returnMsg(0,"删除文章成功",res);
})

router.get("/search",async (ctx)=>{
    // const token=ctx.request.headers.token;

    // if(!jwtVerify(token))
    // {
    //     ctx.body=returnMsg(2,"请求文章失败","token过期或不存在")
    //     return
    // }
    let id=ctx.request.query.id;

    let res=await new Promise((resolve,reject)=>{
        query(`select * from article where id="${id}";`,(err,data)=>{
            if(err)
            reject;
            resolve(data)
        })
    })
    let data=res[0]
    ctx.body=returnMsg(0,"查询文章信息成功",data);
})


router.put("/update",async (ctx)=>{
    // const token=ctx.request.headers.token;

    // if(!jwtVerify(token))
    // {
    //     ctx.body=returnMsg(2,"请求文章失败","token过期或不存在")
    //     return
    // }
    const {content,title,subTitle,id}=ctx.request.body;
    console.log(content,title,subTitle,id);

    let res=await new Promise((resolve,reject)=>{
        query(`update article set content="${content}",title="${title}",subTitle="${subTitle}" where id="${id}"`,(err,data)=>{
            if(err)
            reject;
            resolve(data)
        })
    })
    ctx.body=returnMsg(0,"更新文章信息成功","更新文章信息成功");
})

module.exports=router;