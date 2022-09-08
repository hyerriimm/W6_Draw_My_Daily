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

  const onChangeImage = (e) => {
    // console.log(e.target.files);
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    // FOR BUG IN CHROME
    // e.target.value = "";
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('user_name', user_name);
    formData.append('date', date);
    formData.append('title', title);
    formData.append('image', image);
    formData.append('sayMe', sayme);
    formData.append('content', content);

    dispatch(__createPosts(formData));

    navigate('/');
    resetStates();
  };


  return (
    <div>
      <form id='formid' onSubmit={onSubmitHandler}>

        <NameDiv>
        <label>작성자</label>
        <input 
        type='text' 
        name='user_name' 
        value={user_name}
        maxLength={10}
        disabled
        />

        </NameDiv>

        <DateDiv>
        <label>날짜</label>
        <input 
        type='date' 
        min='2022-09-03' 
        name='date'
        onChange={(e)=>{setDate(e.target.value);}}
        value={date} 
        required />
        </DateDiv>

        <ImgDiv>
          <label>이미지 업로드</label>
          <input 
          type='file' 
          accept='image/*' 
          name='image'
          className='imginput'
          onChange={onChangeImage}
          required
          />
          <img 
          alt="이미지를 업로드 해주세요."
          src={preview ? preview : AddImage}
          style={{display:"block",margin:"0 auto", height:"300px"}}></img>
        </ImgDiv>


        <TitleDiv>
          <label>제목</label>
          <input 
          type='text' 
          name='title'
          onChange={(e)=>{setTitle(e.target.value);}}
          value={title} 
          required
          placeholder="제목을 입력해주세요." 
          maxLength={15}/>
        </TitleDiv>

        <WordDiv>
          <label>수고한 자신에게 한마디</label>
          <input 
          type='text' 
          name='sayme'
          onChange={(e)=>{setSayme(e.target.value);}}
          value={sayme} 
          required
          placeholder="나에게 해주는 한마디를 입력해주세요."
          maxLength={15}/>
        </WordDiv>

        <ContentDiv>
          <label>내용</label>
          <textarea 
          name='content'
          onChange={(e)=>{setContent(e.target.value);}}
          value={content} 
          required
          placeholder="내용을 입력해주세요."
          rows="10"
          maxLength={300}/>
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

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
`;

const PostingBtnDiv = styled.div`
display: flex;
align-items: center;
justify-content: center;
border: transparent;
padding: 5px 20px;
button {
    background-color: #8ab38c;
    color: white;
    font-size: large;
    font-weight: bold;
    margin-bottom: 10px;
    border: transparent;
    border-radius: 10px;
    width: 120px;
    height: 40px;
    :hover {
        box-shadow: 1px 1px 5px #c7c7c7;
    }
    cursor: pointer;

}
`;
