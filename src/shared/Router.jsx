import {Routes, Route} from "react-router-dom"
import Home from '../pages/Home';
import Add from '../pages/Add';
import Detail from '../pages/Detail';



const Router = () => {
    return (
        <Routes>
            <Route path ="/" exact element={<Home/>}/>
            <Route path ="/Add" exact element={<Add/>}/>
            <Route path ="/detail/:id" exact element={<Detail/>}/>
            <Route path ="*" element={<div>잘못된 페이지입니다.</div>}/>
        </Routes>
    )
}

export default Router;