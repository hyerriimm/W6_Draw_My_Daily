import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/layout/Layout'
import PostList from '../components/postlist/PostList';

import TitleImage from '../assets/images/titleimage.jpg'
import { VscBellDot } from "react-icons/vsc";


function Home() {
  let navigate = useNavigate();

  const logIn = localStorage.getItem("token1")
  
  return (
    <Layout>
      <AddBtnDiv>
      <StTitleImageDiv></StTitleImageDiv>
      {logIn === null
        ? <PleaseLogin><VscBellDot size={25}/>로그인 후 그림일기를 작성해보세요!</PleaseLogin>
        : <button onClick={() => navigate('/add')}>일기 쓰기</button>
        }
      </AddBtnDiv>
      <PostList />
    </Layout>
  );
}

export default Home;

const AddBtnDiv = styled.div`
  border: transparent;
  /* background-color: #fff8f0; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 30px 0;
button {
padding: 5px 20px;
/* background-color: rgb(68, 155, 255); */
background-color: #7ebe82;
color: white;
font-size: 20px;
font-weight: bold;
border: transparent;
border-radius: 20px;
width: 150px;
height: 40px;
&:hover {
  box-shadow: 0 80px 0 0  rgba(0,0,0,0.25) inset, 
              0 -80px 0 0 rgba(0,0,0,0.25) inset;
  transform: scale(1.05);
  transition : transform 0.2s ease .1s;
}
}
`;

const StTitleImageDiv = styled.div`
margin-bottom: 20px;
background-image: url(${TitleImage});
background-size: cover;
height:75px;
width: 450px;
`;

const PleaseLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
  color: #a9c0ff;
`