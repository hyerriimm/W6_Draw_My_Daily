import React from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { __login } from "../../redux/modules/users";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const onChangeName = (event) => {
    setUser({ ...user, name: event.target.value });
  };

  const onChangePassword = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(__login(user));
    window.alert("로그인합니다");
    navigate("/");
  };

  return (
    <div>
      <div>
        <RegisterForm onSubmit={onSubmitHandler}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "15px",
              }}
            >
              <p>아이디</p>
              <p>비밀번호</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
                border: "10px",
                padding: "0",
              }}
            >
              <Input type="text" onChange={onChangeName} />
              <Input type="password" onChange={onChangePassword} />
            </div>
          </div>
          <div
            className="btnBox"
            style={{ display: "flex", flexDirection: "column", margin: "20px" }}
          >
            <Button bgColor="#e599f7">로그인</Button>
            <Button onClick={()=>{navigate("/signup")}} bgColor="#e599f7">회원가입</Button>
          </div>
        </RegisterForm>
      </div>
    </div>
  );
};

const RegisterForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export default LoginForm;
