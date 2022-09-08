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
    // /api/posts 게시글 전체조회 GET요청 말고
    // /api/detail/{id} 게시글 상세조회 GET요청으로 postsSlice의 __updatePosts 수정하기

    const logIn = localStorage.getItem("token1");
    const name = localStorage.getItem("name");

    useEffect(()=> {
      dispatch(__getPosts()); 
    }, [isEditMode]);

    let postObj = posts.find((post)=>{
      if (String(post.id) === id) {
        return post
      } else {
        return null
      }
    });
    // console.log(postObj);

  const [user_name, setUser_Name] = useState(postObj?.user_name);
  const [date, setDate] = useState(postObj?.date);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [sayMe, setSayMe] = useState("");
  const [content, setContent] = useState("");

  const resetStates = () => {
    setUser_Name("");
    setDate("");
    setTitle("");
    setImage(null);
    setPreview("");
    setSayMe("");
    setContent("");
  };
  
  const onChangeImg = (e) => {
    // console.log(e.target.files);
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const onSaveHandler = async (e) => {
    e.preventDefault();
    window.confirm('수정사항을 저장하시겠습니까?')
      
    const formData = new FormData();
    formData.append('user_name', user_name);
    formData.append('date', date);
    formData.append('title', title);
    formData.append('image', image);
    formData.append('sayMe', sayMe);
    formData.append('content', content);
    dispatch(__updatePosts({id, formData}));
    setIsEditMode(false);
    resetStates();
    // window.location.reload();
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
          <EditForm onSubmit={onSaveHandler}>
            <BtnGroup>
              <button>저장</button>
              <button onClick={()=>{setIsEditMode(false)}}>취소</button>
            </BtnGroup>
            <NameDiv>
              <div>작성자 : {postObj.user_name}</div>
            </NameDiv>
            <DateDiv>
              <div>날짜 : {postObj.date}</div>
            </DateDiv>
            <TitleEditDiv>
              <h5 style={{fontWeight:'bolder'}}>제목</h5>
              <input 
              required
              placeholder="수정할 제목을 입력해주세요." 
              value={title}
              maxLength={100}
              onChange={(e)=>{setTitle(e.target.value);}}/>
            </TitleEditDiv>
            <ImgEditDiv>
              <h5 style={{fontWeight:'bolder'}}>오늘의 그림 재업로드</h5>
              <p>오늘 하루를 돌아보며 직접 그린 그림을 업로드해주세요.</p>
              <img 
              alt="이미지를 업로드 해주세요."
              src={preview ? preview : AddImage} 
              style={{display:"block",margin:"5px auto", height:"500px"}}></img>
              <input 
              required
              style={{display:"block",margin:"0 auto"}}
              type='file' 
              accept='image/*' 
              name='image'
              className='imginput'
              onChange={onChangeImg}
              />
            </ImgEditDiv>
            <SayMeEditDiv>
              <h5 style={{fontWeight:'bolder'}}>나에게 해주는 한마디</h5>
              <input 
              required
              placeholder="수정할 나에게 해주는 한마디를 입력해주세요."
              value={sayMe}
              maxLength={100}
              onChange={(e)=>{setSayMe(e.target.value);}}/>
            </SayMeEditDiv>
            <ContentEditDiv>
              <h5 style={{fontWeight:'bolder'}}>내용</h5>
              <textarea 
              required
              placeholder="수정할 내용을 입력해주세요."
              value={content}
              maxLength={250}
              rows="10"
              onChange={(e)=>{setContent(e.target.value);}}/>
            </ContentEditDiv>
          </EditForm>
        ) : (
          <NotEditModeDiv>
            <BtnGroup>
              {logIn == null || name !== postObj?.user_name ? false :
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
              <img alt="" src={postObj?.imageURL} style={{display:"block", margin:"0 auto", maxHeight:"500px"}}></img>
            </ImgDiv>
            <SayMeDiv>
              <div>수고한 자신에게 한마디 :  {postObj?.sayMe}</div>
            </SayMeDiv>
            <ContentDiv>
              <div>내용: {postObj?.content}</div>
            </ContentDiv>
          </NotEditModeDiv>
        )}
      </>
    );
}

export default DetailPost;

// ------------ isEditMode 상관없이 공통 ------------
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
  font-size: larger;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  padding: 5px 100px;
  width: fit-content;
`;

const DateDiv = styled.div`
  font-size: larger;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  padding: 5px 100px;
  width: fit-content;
`;

// ------------ 수정 중일때 ------------
const EditForm = styled.form`
margin: 20px auto 50px auto;
`;

const TitleEditDiv = styled.div`
  margin-top: 10px;
  padding: 5px 100px;
  display: flex;
  flex-direction: column;
  input {
    font-size: larger;
    font-weight: bolder;
    width: 100%;
    text-align: left;
    border-radius: 5px;
    background-color: #f6f6f6;
    border: none;
    color: #0d0d0d;
    padding: 15px 32px;
    text-decoration: none;
    display: inline-block;
    border: 2px solid #f6f6f6;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    -webkit-border-radius: 5px 5px 5px 5px;
    :focus {
      background-color: #fff;
      border-bottom: 2px solid #5fbae9;
    }
  }
`;

const ImgEditDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 5px 100px;
  input {
    font-size: larger;
    font-weight: bolder;
    border-radius: 5px;
    background-color: #f6f6f6;
    border: none;
    color: #0d0d0d;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border: 2px solid #f6f6f6;
    width: 400px;
  }
`;

const SayMeEditDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 5px 100px;
  input {
    font-size: larger;
    font-weight: bolder;
    width: 100%;
    text-align: left;
    border-radius: 5px;
    background-color: #f6f6f6;
    border: none;
    color: #0d0d0d;
    padding: 15px 32px;  
    text-decoration: none;
    display: inline-block;
    border: 2px solid #f6f6f6;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    -webkit-border-radius: 5px 5px 5px 5px;
    :focus {
      background-color: #fff;
      border-bottom: 2px solid #5fbae9;
    }
  }
`;

const ContentEditDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 5px 100px;
  textarea {
    font-size: larger;
    font-weight: bolder;
    width: 100%;
    text-align: left;
    border-radius: 5px;
    background-color: #f6f6f6;
    border: none;
    color: #0d0d0d;
    padding: 15px 32px;  
    text-decoration: none;
    display: inline-block;
    border: 2px solid #f6f6f6;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    -webkit-border-radius: 5px 5px 5px 5px;
    :focus {
      background-color: #fff;
      border-bottom: 2px solid #5fbae9;
    }
  }
`;

// ------------ 원래 디테일 페이지 ------------
const NotEditModeDiv = styled.div`
  margin: 20px auto 50px auto;
`;

const ImgDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 100px;
`;

const TitleDiv = styled.div`
font-size: large;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  padding: 5px 100px;
  div {
    font-size: 20px;
  }
`;

const SayMeDiv = styled.div`
  font-size: large;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  padding: 5px 100px;
  div {
    font-size: 20px;
  }
`;

const ContentDiv = styled.div`
  font-size: large;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  padding: 5px 100px;
  margin-bottom: 50px;
  div {
    font-size: 20px;
  }
`;
