import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { createPost } from '../../redux/modules/postsSlice';

function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    name: "",
    date: "",
    title:"",
    imgurl:"",
    sayme:"",
    desc:"",
  };
  const [inputValue, setInputValue] = useState(initialState);

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setInputValue({...inputValue, [name]: value});
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createPost(inputValue));
    setInputValue(initialState);
    navigate('/');
  };

  // console.log(inputValue);

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <NameDiv>
        <label>작성자</label>
        <input 
        type='text' 
        name='name' 
        onChange={onChangeHandler}
        value={inputValue.name}
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
        onChange={onChangeHandler}
        value={inputValue.date} 
        required />
        </DateDiv>
        <ImgDiv>
          <label>이미지 업로드</label>
          <input 
          type='file' 
          accept='image/*' 
          name='imgurl'
          onChange={onChangeHandler}
          value={inputValue.imgurl}
          required />
        </ImgDiv>
        <TitleDiv>
          <label>제목</label>
          <input 
          type='text' 
          name='title'
          onChange={onChangeHandler}
          value={inputValue.title} 
          required
          placeholder="제목을 입력해주세요." 
          maxLength={15}/>
        </TitleDiv>
        <WordDiv>
          <label>수고한 자신에게 한마디</label>
          <input 
          type='text' 
          name='sayme'
          onChange={onChangeHandler}
          value={inputValue.sayme} 
          required
          placeholder="나에게 해주는 한마디를 입력해주세요."
          maxLength={15}/>
        </WordDiv>
        <DescDiv>
          <label>내용</label>
          <textarea 
          name='desc'
          onChange={onChangeHandler}
          value={inputValue.desc} 
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
