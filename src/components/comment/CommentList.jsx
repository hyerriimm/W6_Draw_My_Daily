import React from "react";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { _getComnents } from "../../redux/modules/commentsSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import { CgPen } from "react-icons/si";

function CommentList() {
  const data = useSelector((state) => state.comments.comments);

  
  // console.log(data[0]?.id);

  const dispatch = useDispatch();

  let { id } = useParams();
  // console.log(id);

  useEffect(() => {
    dispatch(_getComnents(id));
  },[]);

  // console.log(data)

  // let comments = data.filter(function (x) {
  //   return x.postId == id;
  // });

  return (
    <CommentContainer>
     <h3>commentList</h3> 
      <AddComment />
      {data.map((data) => (
        <CommentCard data={data} key={uuidv4()} />
      ))}
    </CommentContainer>
  );
}

const CommentContainer = styled.div`
  border: solid 2px #868e96;
  border-radius: 10px;
  padding: 30px;
  width: 1000px;
  margin: 0 auto;
`;

export default CommentList;
