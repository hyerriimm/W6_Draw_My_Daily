import React from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { _getUsersName } from "../../redux/modules/users";
import { useEffect } from "react";

const SignupForm = () => {
  const navigate = useNavigate();
  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");                                 //event.target을 바로 줘서 필요없어진 코드
  // const [passwordConfirm, setPasswordConfirm] = useState("");


const dispatch = useDispatch()


  const usersNameList = useSelector(state => state.users.users)
  // console.log(usersNameList)

 
  const [user, setUser] = useState({
    name: "",
    password: "",
    passwordConfirm: "",
  });

  useEffect(()=>{
    dispatch(_getUsersName())
  },[])

  const onChangeName = (event) => {
    setUser({ ...user, name: event.target.value });
  };
  

  // console.log(user.name)

 const idx = usersNameList.filter((e)=> e.name == user.name)

// console.log(idx)

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
    // console.log(data);

    if (data.success) {
      window.alert("가입완료");
      navigate("/login");
    } else {
      window.alert(data.error.message);
    }
  };

  const regexId = /^(?=.*?[a-z])(?=.*?[0-9]).{3,20}$/
  const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{3,20}$/

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
        
        {/* Idx.length가 0이면 ? (정규표현식 충족 ? 사용가능한아이디 : 정규표현식알려주기) : 이미있는아이디 */}
        
        {user.name && (idx.length === 0  ? (regexId.test(user.name)? <div style={{color:"green", fontSize:"10px"}}>사용가능한 아이디입니다</div>
        : <div style={{color:"red", fontSize:"10px"}}>소문자, 숫자를 포함하여 3자이상 12자 이하</div>) : <div style={{color:"red", fontSize:"10px"}}>이미 있는 아이디입니다.</div>)}



          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="password"
            onChange={onChangePassword}
          />
           {
           user.password && (regexPassword.test(user.password) ? 
           <div style={{color:"green", fontSize:"10px"}}>사용가능한 비밀번호 입니다</div> : 
           <div style={{color:"red", fontSize:"10px"}}>대문자, 소문자, 숫자를 포함하여 3자이상 20자 이하</div>)
           }
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="Confirm password"
            onChange={onChangeConfirmPassword}
          />
          {
          user.passwordConfirm && (user.password !== user.passwordConfirm ? 
          <div style={{color:"red", fontSize:"10px"}}>비밀번호가 일치하지 않습니다</div> : 
          <div style={{color:"green", fontSize:"10px"}}>비밀번호가 일치합니다</div>)
          }
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
