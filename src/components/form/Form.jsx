import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
// import { createPost } from '../../redux/modules/postsSlice';
import axios from 'axios';

function Form() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [imgurl, setImgurl] = useState();
  const [fileImage, setFileImage] = useState("");
  const [sayme, setSayme] = useState("");
  const [desc, setDesc] = useState("");
  
  const onChangeImg = (e) => {
    console.log(e.target.files);
    setImgurl(e.target.files[0]);
    setFileImage(URL.createObjectURL(e.target.files[0]));
    // FOR BUG IN CHROME
    // e.target.value = "";
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("formid"));
    //ㄴ 자동으로 <form>안의 것들을 FormData로 만들어주는듯
    // formData.append('imgurl', imgurl);
    // formData.append('name', name);
    // formData.append('date', date);
    // formData.append('title', title);
    // formData.append('sayme', sayme);
    // formData.append('desc', desc);
      axios.post("http://3.36.71.186:8080/api/auth/posts", formData,{  // 게시글 보내기
          headers:{
          "Content-Type":"multipart/form-data",
      }})
      .then((response) => {
          alert("그림일기 추가 완료!")
          navigate("/")
      })
      .catch((error) => {
          console.log(error);
      })
    setName("");
    setDate("");
    setTitle("");
    setImgurl();
    setFileImage("");
    setSayme("");
    setDesc("");
  };


  return (
    <div>
      <form id='formid' onSubmit={onSubmitHandler}>
        <NameDiv>
        <label>작성자</label>
        <input 
        type='text' 
        name='name' 
        onChange={(e)=>{setName(e.target.value);}}
        value={name}
        required 
        placeholder="이름을 입력해주세요."
        maxLength={10}/>
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
          name='imgurl'
          className='imginput'
          onChange={onChangeImg}
          />
          <img 
          alt=""
          src={fileImage} 
          style={{display:"block",margin:"0 auto",width:"300px", height:"300px"}}></img>
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
        <DescDiv>
          <label>내용</label>
          <textarea 
          name='desc'
          onChange={(e)=>{setDesc(e.target.value);}}
          value={desc} 
          required
          placeholder="내용을 입력해주세요."
          rows="10"
          maxLength={300}/>
        </DescDiv>
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

const DescDiv = styled.div`
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
    border: transparent;
    border-radius: 10px;
    width: 100px;
    height: 30px;
    :hover {
        box-shadow: 1px 1px 5px #c7c7c7;
    }
    cursor: pointer;

}
`;
