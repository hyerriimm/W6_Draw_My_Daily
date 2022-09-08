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
import "./style.css";

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
    // console.log(user.name)
    dispatch(__login(user));
    navigate("/");
    window.location.reload()
  };

  return (
<div className="wrapper fadeInDown">
  <div id="formContent">
    <h2 className="active"> LogIn </h2>
    <div className="fadeIn first">
    </div>
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
              <div style={{ display: "flex", height:"40px",margin:"20px" }}>
          <Button onClick={onSubmitHandler} width="200px" bgColor="#ffd43b">LogIn</Button>
          <Button width="200px"
            onClick={() => {
              navigate("/signup");
            }}
            bgColor="#ff6b6b"
            style={{ marginLeft: "20px" }}
          >
            SignUp
          </Button>
        </div>
      
    
    </form>
    <div id="formFooter">
     
    </div>
  </div>
</div>


   
  );
};


export default LoginForm;
