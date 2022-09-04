import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { _addComnents } from '../../redux/modules/commentsSlice';
import { useParams } from 'react-router-dom';

function AddComment() {

  const dispatch = useDispatch()
  
  const [name, setName] = useState("")
  const [content, setContent] = useState("")
  // const [id, setId] = useState("")
  let id = useParams()
let postId = Number(id.id)

  

  const addComment = (e) => {
    dispatch(_addComnents({name,content,postId
      
    }))
  }

    return (
        <div>
         <p>이름</p> <input type = "text" onChange={(e)=>{
            setName(e.target.value)
          }}></input>

         <p>내용</p> <input type = "text" onChange={(e)=>{
            setContent(e.target.value)
          }}></input>  

          <button 
          onClick={addComment}
          >댓글달기</button>
      </div>
    );
}

export default AddComment;