import React from "react";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { _addComnents } from "../../redux/modules/commentsSlice";
import { useParams } from "react-router-dom";
import Button from "../common/Button";
import styled from "styled-components";
import Input from "../common/Input";

function AddComment() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  let id = useParams();
  let postId = id.id; //postId라는 값으로 useParams를 저장

  const addComment = (e) => {
    e.preventDefault();
    dispatch(_addComnents({ name, content, postId }))
    setContent("");
  };

  const userID = localStorage.getItem("name")
  // console.log(userID)



  return (
    <>
      <AddFormContainer onSubmit={ addComment }>
        User
        <Input style ={{width:"100px"}} value = {userID} disabled/>
        내용
        <Input
          required
          value={content}
          maxLength = {50}
          style = {{width:"600px"}}
          type="text"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></Input>
        <Button bgColor="#a5d8ff">댓글달기</Button>

      </AddFormContainer>
     
    </>
  );
}

// const Input = styled.input`
//   font-size: 15px;
//   padding: 5px;
//   margin: 15px;
//   width: ${(props) => props.width};
//   background: white;
//   border: solid #e9ecef;
//   border-radius: 5px;
// `;

const AddFormContainer = styled.form`
  /* margin: auto; */
  justify-content: space-around;
`;

export default AddComment;
