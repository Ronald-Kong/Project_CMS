import List from "../pages/List";
import App from "../App";
import Register from "../pages/Register";
import Means from "../pages/Means";
import Login from "../pages/Login";
import Edit from "../pages/Edit";
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import Article from "../pages/Article";
import Authority from "../pages/Authority";

const BaseRouter=()=>
    {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="/list" element={<List/>}></Route>
                <Route path="/article/:id" element={<Article/>}></Route>
                <Route path="/means" element={<Means/>}></Route>
                <Route path="/edit" element={<Edit/>}></Route>
                <Route path="/authority" element={<Authority/>}></Route>
                <Route path="/edit/:id" element={<Edit/>}></Route>
                <Route path="/" element={<Navigate to="/list" />} />
            </Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
        </Routes>
    </BrowserRouter>
    )
    }


export default BaseRouter