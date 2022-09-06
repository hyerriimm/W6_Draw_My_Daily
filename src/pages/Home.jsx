import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/layout/Layout'
import PostList from '../components/postlist/PostList';

function Home() {
  let navigate = useNavigate();
  
  return (
    <Layout>
      <AddBtnDiv>
      <button onClick={() => navigate('/add')}>일기 쓰기</button>
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