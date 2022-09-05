import request from "./request"

export const RegisterApi=(params)=>request.post("/register",params)
export const LoginApi=(params)=>request.post("/login",params)
export const ArticleListApi=(params)=>request.get("/article",{params})
export const ArticleAddApi=(params)=>request.post("/article/add",params)
export const ArticleGetApi=(params)=>request.get("/article/search",{params})
export const ArticleUpdateApi=(params)=>request.put("/article/update",params)
export const ArticleDeleteApi=(params)=>request.post("/article/remove",params)
export const InfoGetApi=()=>request.get("/info")
export const InfoChangeApi=(params)=>request.put("/info",params)
export const UserGetApi=()=>request.get("/")
export const AuthorityChangeApi=(params)=>request.put("/authority",params)