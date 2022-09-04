import React from "react";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { _getComnents } from "../../redux/modules/commentsSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function CommentList() {
  const data = useSelector((state) => state.comments.comments);

  // console.log(data)
  // console.log(data[0]?.id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_getComnents());
  }, [dispatch]);

  let {id} = useParams()
  console.log(id)

  let comments = data.filter(function (x) { return x.postId == id })

  return (
    <div>
    
      <AddComment />
      <h2>코멘트 리스트</h2>

      {comments
      .map(( data ) => ( < CommentCard data={data} key =  {data.id} /> ))}
      
    </div>
  );
}

export default CommentList;
