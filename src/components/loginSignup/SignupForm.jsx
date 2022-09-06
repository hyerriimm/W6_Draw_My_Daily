import React from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const SignupForm = () => {


  // const [name, setName] = useState("");      
  // const [password, setPassword] = useState("");                                 //event.target을 바로 줘서 필요없어진 코드
  // const [passwordConfirm, setPasswordConfirm] = useState("");

   const [user,setUser]=useState({
    name:"",
    password:"",
    passwordConfirm:""
  })


  const onChangeName= (event) => {
    setUser({ ...user, name:event.target.value });
  };

  const onChangePassword = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  const onChangeConfirmPassword = (event) => {
    setUser({ ...user, passwordConfirm: event.target.value });
  };


  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const { data } = await axios.post("http://3.36.71.186:8080/api/users/signup",user
    );
    console.log(data);

    if (data.success) {
      window.alert("가입완료")
    } 
    else {
      window.alert(data.error.message);
    }
  };




  return (
    <div>
      <RegisterForm
        onSubmit= {onSubmitHandler}
      >
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
            <p>비밀번호확인</p>
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
            <Input
              type="text"
              onChange={onChangeName}
            />
            <Input
              type="password"
              onChange={onChangePassword}
            />
            <Input
              type="password"
              onChange={onChangeConfirmPassword}
            />
          </div>
        </div>

        <Button bgColor="#e599f7">회원가입</Button>
      </RegisterForm>
    </div>
  );
};

const RegisterForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export default SignupForm;
