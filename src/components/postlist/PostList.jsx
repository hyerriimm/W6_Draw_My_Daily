import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Post from './Post';
import { __getPosts } from "../../redux/modules/postsSlice";

function PostList() {
  const dispatch = useDispatch();
  const { isLoading, error, posts } = useSelector((state) => state.posts);
  // console.log(posts);

  useEffect(() => {
    dispatch(__getPosts());
  },[posts.length]);

  if (isLoading) {
    return <Loading>로딩 중•••</Loading>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (posts.length === 0) {
    return (
      <Stack>
        <Empty>👩‍🎨•••📖</Empty>
        <div>게시된 그림일기가 없습니다.</div>
        <div>그림일기를 작성해주세요.</div>
      </Stack>
    );
  }

  return (
    <StContainer>
      {posts
        // .slice()
        // .reverse()
        .map((post) => {
          return <Post key={uuidv4()} post={post} />;
        })}
    </StContainer>
  );
}

export default PostList;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  height: 400px;
  font-size: 30px;
  font-weight: bold;
  color: #bdbdbd;
`

const Stack = styled.div`
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  div{
  font-size: 18px;
  font-weight: bold;
  color: #555555;
  }
`;

const Empty = styled.h1`
  font-size: 100px;
`;

const StContainer = styled.div`
  margin: 0 auto;                 
  padding-left: 10px;         
`;