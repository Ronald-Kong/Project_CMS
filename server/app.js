const Koa=require("koa2");
const Router=require("koa-router")
const manage=require("./router/manage")
const bodyParser=require("koa-bodyparser")
const nomatch=require("./router/nomatch")
const cors=require("koa2-cors")
const {host,port} =require("./utils");
const static=require("koa-static");
const path=require("path")

const app=new Koa();
const router=new Router();

router.use("/manage",manage.routes(),manage.allowedMethods());
router.use("/404",nomatch.routes(),nomatch.allowedMethods());
router.redirect("/","/manage")


app.use(async (ctx,next)=>{
    await next();
    if(parseInt(ctx.status)===404)
     ctx.response.redirect("/404");
})

app.use(cors());

app.use(bodyParser());

app.use(router.routes(),router.allowedMethods())

app.use(static(path.join(__dirname,"./static")))
app.use(static(path.join(__dirname,"./router/manage/")))

app.listen(port,()=>{
    console.log(`Server is running on ${host}`)
})