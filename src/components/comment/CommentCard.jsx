import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { _getComnents } from "../../redux/modules/commentsSlice";
import { useSelector } from "react-redux";


function CommentCard({data}) {
  const dispatch = useDispatch();



  return (
    <div>
        {data.name}
        {data.content}
      
    </div>
  );
}

export default CommentCard;
