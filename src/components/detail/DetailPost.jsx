import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom';
import styled from 'styled-components';
import { __getPosts, updatePost, deletePost } from '../../redux/modules/postsSlice';

function DetailPost() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [isEditMode, setIsEditMode] = useState(false);
    const { isLoading, error, posts } = useSelector((state) => state.posts);

    // console.log(posts);

    let postObj = posts.find((post)=>{
      if (String(post.id) === id) {
        return post
      } else {
        return null
      }
    });
    // console.log(postObj);
    // find는 조건을 만족하는 배열의 첫 번째 요소의 '값'을 반환함.

    const initialState = {
      id: id,
      name: postObj.name,
      date: postObj.date,
      title: postObj.title,
      imgurl: "",
      sayme: postObj.sayme,
      desc: postObj.desc,
    };
    const [updatedPost, setUpdatedPost] = useState(initialState);

    useEffect(()=> {
      dispatch(__getPosts());
    }, [dispatch]);

    const onSaveBtnHandler = () => {
      if (
        updatedPost.title.trim() === '' ||
        updatedPost.imgurl.trim() === '' ||
        updatedPost.sayme.trim() === '' ||
        updatedPost.desc.trim() === ''
      ) {
        return alert('모든 항목을 입력하고 저장하세요.');
      }
      else if (window.confirm('수정사항을 저장하시겠습니까?'))
      {dispatch(updatePost(updatedPost));
      setIsEditMode(false);
      setUpdatedPost(initialState);}
      dispatch(__getPosts()); //수정 후 바로 수정된게 안보여서 추가해봄
    };

    const onDeleteHandler = () => {
      if (window.confirm('일기를 삭제하시겠습니까?')) {
        dispatch(deletePost(id));
        navigate('/');
      }
    };

    if (isLoading) {
      return <div>로딩 중....</div>;
    };
    if (error) {
      return <div>{error.message}</div>;
    };
    


    return (
      <>
        {isEditMode ? (
          <div>
            <BtnGroup>
              <button onClick={onSaveBtnHandler}>저장</button>
              <button onClick={()=>{setIsEditMode(false)}}>취소</button>
            </BtnGroup>
            <NameDiv>
              <div>작성자 : {postObj.name}</div>
            </NameDiv>
            <DateDiv>
              <div>날짜 : {postObj.date}</div>
            </DateDiv>
            <TitleDiv>
              <div>제목</div>
              <input 
              value={updatedPost.title}
              maxLength={100}
              onChange={(e)=>{setUpdatedPost({...updatedPost, title: e.target.value});}}/>
            </TitleDiv>
            <ImgDiv>
              <p>이미지 재업로드</p>
              <input 
              value={updatedPost.imgurl}
              onChange={(e)=>{setUpdatedPost({...updatedPost, imgurl: e.target.value});}}type='file'/>
            </ImgDiv>
            <WordDiv>
              <div>수고한 자신에게 한마디 : </div>
              <input 
              value={updatedPost.sayme}
              maxLength={100}
              onChange={(e)=>{setUpdatedPost({...updatedPost, sayme: e.target.value});}}/>
            </WordDiv>
            <DescDiv>
              <div>내용: </div>
              <textarea 
              value={updatedPost.desc}
              maxLength={300}
              rows="10"
              onChange={(e)=>{setUpdatedPost({...updatedPost, desc: e.target.value});}}/>
            </DescDiv>
          </div>
        ) : (
          <div>
            <BtnGroup>
              <button onClick={()=>{setIsEditMode(true);}}>수정</button>
              <button onClick={onDeleteHandler}>삭제</button>
            </BtnGroup>
            <NameDiv>
              <div>작성자 : {postObj.name}</div>
            </NameDiv>
            <DateDiv>
              <div>날짜 : {postObj.date}</div>
            </DateDiv>
            <TitleDiv>
              <div>제목 : {postObj.title}</div>
            </TitleDiv>
            <ImgDiv>
              <div>{postObj.imgurl}</div>
            </ImgDiv>
            <WordDiv>
              <div>수고한 자신에게 한마디 :  {postObj.sayme}</div>
            </WordDiv>
            <DescDiv>
              <div>내용: {postObj.desc}</div>
            </DescDiv>
          </div>
        )}
      </>
    );
}

export default DetailPost;

const BtnGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    button {
        margin: 8px;
    }
`

const NameDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
  width: fit-content;
`;

const DateDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
  width: fit-content;
`;

const ImgDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
  div {
    width: 200px;
    height: 100px;
    background-color: green;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
`;

const WordDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
`;

const DescDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
`;

// const PostingBtnDiv = styled.div`
// display: flex;
// align-items: center;
// justify-content: center;
// border: transparent;
// padding: 5px 20px;
// button {
//     background-color: #8ab38c;
//     color: white;
//     border: transparent;
//     border-radius: 10px;
//     width: 100px;
//     height: 30px;
//     :hover {
//         box-shadow: 1px 1px 5px #c7c7c7;
//     }
//     cursor: pointer;
// }
// `;