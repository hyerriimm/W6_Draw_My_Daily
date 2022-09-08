import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { logout } from "../../redux/modules/users";
import { useDispatch } from 'react-redux';
import { GoHome } from "react-icons/go";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logIn = localStorage.getItem("token1")

    return (
      <StContainer>
        <HomeBtn
          onClick={() => {
            navigate('/');
          }}
        >
          <GoHome size='30' color='rgb(68, 155, 255)'/>
          <StText>Draw My Daily</StText>
        </HomeBtn>

        <div>
          {logIn == null                                           
          ? <Stbutton   
          onClick={()=>{navigate("/login")}}>Login</Stbutton>              
          :
          <>
            <Stbutton 
            onClick={()=>{window.alert("로그아웃합니다");dispatch(logout());  
            navigate("/")}}>Logout</Stbutton> 
            <Stbutton onClick={()=>{navigate("/mypage")}}>My Page</Stbutton>
          </>
           }
        </div>
      </StContainer>
    );
}

export default Header;

const StContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 10px;
  background-color: #ffffe7;
  /* background-color: #e7f3ff; */
`;

const HomeBtn = styled.button`
  display: flex;
  margin: 0 10px;
  font-size: 17px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Stbutton = styled.button`
  margin: 0 10px;
  font-size: 20px;
  font-weight: bolder;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const StText = styled.div`
  margin-left: 10px;
  font-size: 20px;
  font-weight: bolder;
`;
