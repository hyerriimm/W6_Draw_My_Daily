import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout'
import PostList from '../components/postlist/PostList';

function Home() {
  let navigate = useNavigate();
  return (
    <Layout>
      <h1>그림일기 Draw My Daily</h1>
        <button onClick={() => navigate('/add')}>일기쓰기</button>
      <PostList />
    </Layout>
  );
}

export default Home;