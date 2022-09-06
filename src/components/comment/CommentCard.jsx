import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { _deleteComnents } from "../../redux/modules/commentsSlice";
import Button from "../common/Button";

function CommentCard({ data }) {
  const dispatch = useDispatch();

  const removeComment = () => {
    dispatch(_deleteComnents(data.id));
  };

  return (
    <div style={{display:"flex", alignItems:"center"}} className="commentContainer">

      <img
        width={70}
        src="https://item.kakaocdn.net/do/aa477c06403020a13ff7e119b3f108a1f43ad912ad8dd55b04db6a64cddaf76d"
      ></img>

        <div style ={{display:"flex", flexDirection:"column",padding: "0 20px", width:"700px"}}>
          <div style={{ fontSize: "13px" }}>{data.name}</div> <div>{data.content}</div>
          </div>
          
     

        <div>
          <Button
            bgColor="pink"
            onClick={() => {
              removeComment();
            }}
          >
            삭제{" "}
          </Button>
          <Button bgColor="#c0eb75">수정</Button>
        </div>
      
    </div>
  );
}

const CommentContainer = styled.div`
  border-radius: 7px;
  border: solid 1px #ced4da;
`;

export default CommentCard;
