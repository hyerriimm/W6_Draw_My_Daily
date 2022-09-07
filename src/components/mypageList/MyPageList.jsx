import React from 'react'
import MyPageCard from './MyPageCard'
import { __getPosts } from '../../redux/modules/postsSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const MyPageList = () => {
  const {  posts } = useSelector((state) => state.posts);
  console.log(posts)
  const dispatch = useDispatch()

  const name = localStorage.getItem("name")

  useEffect(() => {
    dispatch(__getPosts());
  },[]);


  let filterdPost = posts.filter(function (x) {
    return x.user_name == name;
  });
  console.log(filterdPost.length)

  return (
    <div>

<StContainer>

  {filterdPost.length === 0 ?<PleaseLogin> 🚨 작성한 포스트가 없습니다 🚨</PleaseLogin>:filterdPost.map((post)=>{return <MyPageCard post={post} key={uuidv4()} />})}      

  
  {/* {posts.map((post)=>{return <MyPageCard post={post} key={uuidv4()} />})}     */}
</StContainer>
  

    </div>
  )
}

export default MyPageList

const StContainer = styled.div`
 display: flex;
 flex-direction: row;
  margin: 0 auto;                 
  padding-left: 10px;         
`;

const PleaseLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 30px 0;
  font-size: 25px;
  font-weight: bold;
  color: #a9c0ff;
  
`