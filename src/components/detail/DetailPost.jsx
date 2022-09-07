import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom';
import styled from 'styled-components';
import { __getPosts, __updatePosts, __deletePosts } from '../../redux/modules/postsSlice';
import AddImage from '../../assets/images/addimage.png';
import { VscTrash } from "react-icons/vsc";
import { VscEdit } from "react-icons/vsc";

function DetailPost() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [isEditMode, setIsEditMode] = useState(false);
    const { isLoading, error, posts } = useSelector((state) => state.posts);

    const logIn = localStorage.getItem("token1");
    const name = localStorage.getItem("name");

    useEffect(()=> {
      dispatch(__getPosts()); 
    }, [dispatch, isEditMode]);

    let postObj = posts.find((post)=>{
      if (String(post.id) === id) {
        return post
      } else {
        return null
      }
    });
    // console.log(postObj);

  const [user_name, setUser_Name] = useState(postObj.user_name);
  const [date, setDate] = useState(postObj.date);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [preview, setPreview] = useState("");
  const [sayme, setSayme] = useState("");
  const [content, setContent] = useState("");

  const resetStates = () => {
    setUser_Name("");
    setDate("");
    setTitle("");
    setImage();
    setPreview("");
    setSayme("");
    setContent("");
  };
  
  const onChangeImg = (e) => {
    // console.log(e.target.files);
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const onSaveBtnHandler = async (e) => {
    if (
      title.trim() === '' ||
      image.trim() === '' ||
      sayme.trim() === '' ||
      content.trim() === ''
    ) {
      return alert('모든 항목을 입력하고 저장하세요.');
    } else if (window.confirm('수정사항을 저장하시겠습니까?'))
      {
        const formData = new FormData();
        formData.append('user_name', user_name);
        formData.append('date', date);
        formData.append('title', title);
        formData.append('image', image);
        formData.append('sayme', sayme);
        formData.append('content', content);
        dispatch(__updatePosts(formData));
        setIsEditMode(false);
        resetStates();
    }
  };

  const onDeleteHandler = () => {
    if (window.confirm('일기를 삭제하시겠습니까?')) {
      dispatch(__deletePosts(id));
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
          <>
            <BtnGroup>
              <button onClick={onSaveBtnHandler}>저장</button>
              <button onClick={()=>{setIsEditMode(false)}}>취소</button>
            </BtnGroup>
            <NameDiv>
              <div>작성자 : {postObj.user_name}</div>
            </NameDiv>
            <DateDiv>
              <div>날짜 : {postObj.date}</div>
            </DateDiv>
            <TitleDiv>
              <div>제목</div>
              <input 
              value={title}
              maxLength={100}
              onChange={(e)=>{setTitle(e.target.value);}}/>
            </TitleDiv>
            <ImgDiv>
              <lable>이미지 재업로드</lable>
              <input 
              type='file' 
              accept='image/*' 
              name='image'
              className='imginput'
              onChange={onChangeImg}
              />
              <img 
              alt="이미지를 업로드 해주세요."
              src={preview ? preview : AddImage} 
              style={{display:"block",margin:"0 auto", height:"300px"}}></img>
            </ImgDiv>
            <WordDiv>
              <div>수고한 자신에게 한마디 : </div>
              <input 
              value={sayme}
              maxLength={100}
              onChange={(e)=>{setSayme(e.target.value);}}/>
            </WordDiv>
            <ContentDiv>
              <div>내용: </div>
              <textarea 
              value={content}
              maxLength={300}
              rows="10"
              onChange={(e)=>{setContent(e.target.value);}}/>
            </ContentDiv>
          </>
        ) : (
          <div>
            <BtnGroup>
              {logIn == null || name !== postObj.user_name ? false :
              (
                <>
              <button onClick={()=>{setIsEditMode(true);}}><VscEdit size='20' color='#fff' /></button>
              <button onClick={onDeleteHandler}><VscTrash size='20' color='#fff' /></button>
                </>
              )}
            </BtnGroup>
            <NameDiv>
              <div>작성자 : {postObj?.user_name}</div>
            </NameDiv>
            <DateDiv>
              <div>날짜 : {postObj?.date}</div>
            </DateDiv>
            <TitleDiv>
              <div>제목 : {postObj?.title}</div>
            </TitleDiv>
            <ImgDiv>
              <img alt="" src={postObj?.image} style={{display:"block", margin:"0 auto", maxHeight:"500px"}}></img>
            </ImgDiv>
            <WordDiv>
              <div>수고한 자신에게 한마디 :  {postObj?.sayme}</div>
            </WordDiv>
            <ContentDiv>
              <div>내용: {postObj?.content}</div>
            </ContentDiv>
          </div>
        )}
      </>
    );
}

export default DetailPost;

const BtnGroup = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  button {
    border: transparent;
    background-color: #7fb2ff;
    color: white;
    font-weight: bold;
    border-radius: 8px;
    padding: 5px 10px;
      margin: 8px;
  }
`;

const NameDiv = styled.div`
  font-size: large;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
  width: fit-content;
`;

const DateDiv = styled.div`
  font-size: large;
  font-weight: bold;
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
font-size: large;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
`;

const WordDiv = styled.div`
  font-size: large;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
`;

const ContentDiv = styled.div`
  font-size: large;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
  margin-bottom: 50px;
`;
