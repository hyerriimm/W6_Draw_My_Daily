import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/layout/Layout'
import PostList from '../components/postlist/PostList';
// import { useEffect } from 'react';
// import { __getPosts } from '../redux/modules/postsSlice';
// import { useDispatch } from 'react-redux';


function Home() {
  let navigate = useNavigate();

  // const dispatch = useDispatch()

  // useEffect(()=>{dispatch(__getPosts)},[])

  const logIn = localStorage.getItem("token1")
  
  return (
    <Layout>
      <AddBtnDiv>

        {logIn === null
        ? <h1>회원에게만 글 작성이 가능합니다</h1>
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
  background-color: #fff8f0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 30px 0;
button {
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
  box-shadow: 0 80px 0 0  rgba(0,0,0,0.25) inset, 
              0 -80px 0 0 rgba(0,0,0,0.25) inset;
}
}
`;