import Layout from "../components/layout/Layout";
import DetailPost from "../components/detail/DetailPost";
import CommentList from "../components/comment/CommentList"


const Detail = () => {
    return (
      <Layout>
        <DetailPost />
        <CommentList />
      </Layout>
    );
}

export default Detail;