const Koa=require("koa2");
const Router=require("koa-router")
const {query}=require("../../utils")
const login=require("./login")
const register=require("./register")
const info=require("./info")
const upload=require("./upload")
const article=require("./article")
const authority=require("./authority")
const router=new Router()


router.get("/",async (ctx)=>{
    let res=await new Promise((resolve,reject)=>{
        query("select * from user",(err,data)=>{
            if(err)
            reject;
            resolve(data)
        })
    })
    ctx.body=res;
})

router.use("/login",login.routes(),login.allowedMethods());
router.use("/register",register.routes(),register.allowedMethods());
router.use("/info",info.routes(),info.allowedMethods());
router.use("/upload",upload.routes(),upload.allowedMethods());
router.use("/article",article.routes(),article.allowedMethods());
router.use("/authority",authority.routes(),authority.allowedMethods());

module.exports=router;
