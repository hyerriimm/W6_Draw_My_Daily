import React from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { __login } from "../../redux/modules/users";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

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
    console.log(user.name)
    dispatch(__login(user));
    window.alert("로그인합니다");
    navigate("/");
  };

  return (
    <Container >
      <Form  onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>ID</Form.Label>
          <Input  onChange={onChangeName} style={{ width: "200px" }} type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label >Password</Form.Label>
          <Input onChange={onChangePassword} style={{ width: "200px" }} type="password" />
        </Form.Group>
        <div style={{ display: "flex" }}>
          <Button bgColor="#ffd43b">로그인</Button>
          <Button
            onClick={() => {
              navigate("/signup");
            }}
            bgColor="#ff6b6b"
            style={{ marginLeft: "20px" }}
          >
            회원가입
          </Button>
        </div>
      </Form>

      {/* <div>
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
      </div> */}
    </Container >
  );
};

// const RegisterForm = styled.form`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   min-height: 100vh;
// `;

const Container = styled.div`
display: felx;
align-items: center;
justify-content: center;
`
export default LoginForm;
