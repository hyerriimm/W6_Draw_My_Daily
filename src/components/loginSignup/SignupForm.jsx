import React from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");                                 //event.target을 바로 줘서 필요없어진 코드
  // const [passwordConfirm, setPasswordConfirm] = useState("");

  const [user, setUser] = useState({
    name: "",
    password: "",
    passwordConfirm: "",
  });

  const onChangeName = (event) => {
    setUser({ ...user, name: event.target.value });
  };

  const onChangePassword = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  const onChangeConfirmPassword = (event) => {
    setUser({ ...user, passwordConfirm: event.target.value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const { data } = await axios.post(
      "http://3.36.71.186:8080/api/users/signup",
      user
    );
    console.log(data);

    if (data.success) {
      window.alert("가입완료");
      navigate("/login");
    } else {
      window.alert(data.error.message);
    }
  };

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h2 className="active"> Signup </h2>
        <div className="fadeIn first"></div>
        <form>
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="login"
            onChange={onChangeName}
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="password"
            onChange={onChangePassword}
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="password"
            onChange={onChangeConfirmPassword}
          />
          <Button
            style={{ margin: "20px", height: "40px" }}
            onClick={onSubmitHandler}
            width="200px"
            bgColor="#ff6b6b"
          >
            SignUp
          </Button>
        </form>
        <div id="formFooter"></div>
      </div>
    </div>
  );
};

export default SignupForm;
