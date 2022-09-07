import {Routes, Route} from "react-router-dom"
import Home from '../pages/Home';
import Add from '../pages/Add';
import Detail from '../pages/Detail';
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import MyPage from "../pages/MyPage";



const Router = () => {
    return (
        <Routes>
            <Route path ="/" exact element={<Home/>}/>
            <Route path ="/Add" exact element={<Add/>}/>
            <Route path ="/detail/:id" exact element={<Detail/>}/>
            <Route path ="/login" exact element={<Login/>}/>
            <Route path ="/signup" exact element={<SignUp/>}/>
            <Route path ="/mypage" exact element={<MyPage/>}/>
        </Routes>
    )
}

export default Router;