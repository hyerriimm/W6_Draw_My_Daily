import React from 'react';
import Button from '../common/Button';
import {logout} from '../../redux/modules/users'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div style={{display:"flex"}}>
      <Button bgColor="#e599f7" onClick={()=>{navigate("/login")}} >로그인하기</Button>
      <Button bgColor="black" onClick={()=>{dispatch(logout())}} >로그아웃</Button>
        </div>
    );
}

export default Header;