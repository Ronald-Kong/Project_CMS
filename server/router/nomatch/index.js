const Koa=require("koa2");
const Router=require("koa-router")
const fs=require("fs")
const path=require("path")
const mime=require("mime-types")

const router=new Router()

router.get("/",async (ctx)=>{
    let filePath=path.join(__dirname,"../../static/images/404.png");
    let file=fs.readFileSync(filePath);
    let type=mime.lookup(filePath);
    ctx.set("content-type",type)
    ctx.body=file;
})

module.exports=router;
