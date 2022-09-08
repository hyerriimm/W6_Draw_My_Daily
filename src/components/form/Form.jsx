import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { __createPosts } from '../../redux/modules/postsSlice';
import AddImage from '../../assets/images/addimage.png';

function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const userId = localStorage.getItem('name');
  const [user_name, setUser_Name] = useState(localStorage.getItem('name'));
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null); //용태매니저님이 null넣으라고 했음
  const [preview, setPreview] = useState("");
  const [sayMe, setSayMe] = useState("");
  const [content, setContent] = useState("");

  const resetStates = () => {
    setUser_Name("");
    setDate("");
    setTitle("");
    setImage(null); //용태매니저님이 null넣으라고 했음
    setPreview("");
    setSayMe("");
    setContent("");
  };

  const onChangeImage = (e) => {
    // console.log(e.target.files);
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    // FOR BUG IN CHROME
    // e.target.value = "";
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (date.trim() === '' ||
        image === null ||
        sayMe.trim() === '' ||
        content.trim() === ''
    ) {
      return alert('모든항목을 입력하고 일기를 추가해주세요!')
    }
    const formData = new FormData();
    formData.append('user_name', user_name);
    formData.append('date', date);
    formData.append('title', title);
    formData.append('image', image);
    formData.append('sayMe', sayMe);
    formData.append('content', content);

    dispatch(__createPosts(formData));

    navigate('/');
    resetStates();
  };


  return (
    <div>
      <form id='formid' onSubmit={onSubmitHandler}>

        <NameDiv>
        <h5>작성자</h5>
        <input 
        type='text' 
        name='user_name' 
        value={user_name}
        maxLength={10}
        disabled
        />
        </NameDiv>

        <DateDiv>
        <h5>날짜</h5>
        <input 
        type='date' 
        min='2022-09-01' 
        name='date'
        onChange={(e)=>{setDate(e.target.value);}}
        value={date}  />
        </DateDiv>

        <ImgDiv>
          <h5 style={{margin:"10px 0 10px 0"}}>오늘의 그림</h5>
          <p>오늘 하루를 돌아보며 직접 그린 그림을 업로드해주세요.</p>
          <img 
          alt="이미지를 업로드 해주세요."
          src={preview ? preview : AddImage}
          style={{display:"block",margin:"5px auto", height:"500px"}}></img>
          <input 
          style={{display:"block",margin:"0 auto"}}
          type='file' 
          accept='image/*' 
          name='image'
          className='imginput'
          onChange={onChangeImage}
          />
        </ImgDiv>


        <TitleDiv>
          <h5>제목</h5>
          <input 
          type='text' 
          name='title'
          onChange={(e)=>{setTitle(e.target.value);}}
          value={title} 
          placeholder="제목을 입력해주세요." 
          maxLength={13}/>
        </TitleDiv>

        <SayMeDiv>
          <h5>나에게 해주는 한마디</h5>
          <input 
          type='text' 
          name='sayMe'
          onChange={(e)=>{setSayMe(e.target.value);}}
          value={sayMe} 
          placeholder="나에게 해주는 한마디를 입력해주세요."
          maxLength={13}/>
        </SayMeDiv>

        <ContentDiv>
          <h5>내용</h5>
          <textarea 
          name='content'
          onChange={(e)=>{setContent(e.target.value);}}
          value={content} 
          placeholder="내용을 입력해주세요."
          rows="10"
          maxLength={250}/>
        </ContentDiv>

        <PostingBtnDiv>
            <button>일기 추가</button>
        </PostingBtnDiv>
      </form>
    </div>
  );
}

export default Form;

// const NameAndDateDiv = styled.div`
//   display: flex;
//   justify-content: space-around;
//   padding: 5px 20px;
// `;

const NameDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 20px;
  margin-top: 10px;
  width: fit-content;
  input {
    margin-left: 10px;
    width: 200px;
    height: 30px;
    color: #34ade9;
    font-size: larger;
    font-weight: bolder;
  }
`;

const DateDiv = styled.div`
  display: flex;
  padding: 5px 20px;
  width: fit-content;
  input {
    font-size: larger;
    font-weight: bolder;
    margin-left: 30px;
    width: 200px;
    height: 30px;
    border-radius: 5px;
    background-color: #f6f6f6;
    border: none;
    color: #0d0d0d;
    padding: 15px 32px;
    text-align: center;
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

const ImgDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
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
  }
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
  input {
    font-size: larger;
    font-weight: bolder;
    width: 100%;
    text-align: left;
  }
`;

const SayMeDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
  input {
    font-size: larger;
    font-weight: bolder;
    width: 100%;
    text-align: left;
  }
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
  textarea {
    font-size: larger;
    font-weight: bolder;
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

const PostingBtnDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: transparent;
  padding: 5px 20px;
  button {
    margin: 10px auto 30px auto;
    padding: 5px 20px;
    background-color: rgb(68, 155, 255);
    color: white;
    font-size: 20px;
    font-weight: bold;
    border: transparent;
    border-radius: 20px;
    width: 150px;
    height: 40px;
    &:hover {
      box-shadow: 0 80px 0 0 rgba(0, 0, 0, 0.25) inset,
        0 -80px 0 0 rgba(0, 0, 0, 0.25) inset;
      transform: scale(1.05);
      transition: transform 0.2s ease 0.1s;
    }
  }
`;
