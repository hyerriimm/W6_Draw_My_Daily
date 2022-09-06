import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { logout } from "../../redux/modules/users";
import { useDispatch } from 'react-redux';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch()


    return (
      <StContainer>
        <HomeBtn
          onClick={() => {
            navigate('/');
          }}
        >
          ↩ Home
        </HomeBtn>
        <StText>Draw My Daily</StText>
        <div>
          <Stbutton>My Page</Stbutton>
          <Stbutton 
          onClick={()=>{navigate("/login")}}>Login</Stbutton>
          <Stbutton 
          onClick={()=>{window.alert("로그아웃합니다");dispatch(logout());
          navigate("/")}}>Logout</Stbutton>
        </div>
      </StContainer>
    );
}

export default Header;

const StContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    padding: 10px;
    background-color: #e7f3ff;
`;

const HomeBtn = styled.button`
    margin: 0 10px;
    font-size: 17px;
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

const Stbutton = styled.button`
    margin: 0 10px;
    font-size: 17px;
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

const StText = styled.div`
    /* margin: 0 20px; */
    margin-left: 80px;
    font-size: 20px;
    font-style: italic;
`;
