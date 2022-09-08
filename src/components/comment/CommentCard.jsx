import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { _deleteComnents } from "../../redux/modules/commentsSlice";
import Button from "../common/Button";
import Input from "../common/Input";
import { _editComnents } from "../../redux/modules/commentsSlice";
import { useParams } from "react-router-dom";

function CommentCard({ data }) {
  const dispatch = useDispatch();


  const removeComment = () => {
    dispatch(_deleteComnents(data.id));
  };
  // console.log(data)
  // console.log(data.content)

  // const [edit, setEdit] = useState(false);

  // const editChange = () => {
  //   edit === true ? setEdit(false) : setEdit(true);
  // };
 
  // console.log(data)

  const {id} = useParams()
  // console.log(parseInt(id))
  const postId = parseInt(id)
  // console.log(typeof(postId))

  const [content, setContent] = useState("");


  
//객체로 묶는 부분

  // const data = useState({  
  //   name:data.user_name,
  //   id:postId
  //   content:""
  // })




  const editComment = () => {
    dispatch(_editComnents(content, postId
      // data.id, content, data.user_name, postId
      ));                               //  객체로 모아서 페이로드 보내기
  };

  return (
    <>
      {/* {edit 
      ? 
      //수정모드
      
        <div style={{
        display: "flex",
        padding: "0 20px",
        alignItems: "center",
        width: "900px",}}>
          <img width={70} src="https://item.kakaocdn.net/do/aa477c06403020a13ff7e119b3f108a1f43ad912ad8dd55b04db6a64cddaf76d"></img>

         <div><div style={{ fontSize: "13px" }}>{data.user_name}</div> <Input onChange={(e)=>{setContent(e.target.value)}} width = "600px" /></div> 

         <Button 
         onClick={() => { editComment();}}
          bgColor="#b197fc">완료</Button>
        <Button bgColor="#e599f7" onClick = {editChange} >취소</Button>
        </div>
      
      
      : 
      //기본모드 */}
      
        <div
          style={{ display: "flex", alignItems: "center" }}
          className="commentContainer"
        >
          <div
            style={{
              display: "flex",
              padding: "0 20px",
              alignItems: "center",
              width: "700px",
            }}
          >
            <img width={70} src="https://item.kakaocdn.net/do/aa477c06403020a13ff7e119b3f108a1f43ad912ad8dd55b04db6a64cddaf76d"></img>
          <div> 
            <div style={{ fontSize: "13px" }}>{data.user_name}</div>
            <div>{data.content}</div>
          </div>
           
          </div>
          <div> 
          </div>
          {/* <Button onClick={editChange} bgColor="#c0eb75">수정</Button> */}
      <Button bgColor="pink" onClick={() => { removeComment();}}>삭제</Button>

        </div>
      {/* } */}




    </>
  );
}

const CommentContainer = styled.div`
  border-radius: 7px;
  border: solid 1px #ced4da;
`;

export default CommentCard;
