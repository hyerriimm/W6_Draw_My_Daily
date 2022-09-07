import React from 'react'
import MyPageCard from './MyPageCard'
import { __getMyPosts } from '../../redux/modules/mypageSlice';
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
    dispatch(__getMyPosts(name));
  },[]);


  return (
    <div>

<StContainer>
  {posts.map((post)=>{return <MyPageCard post={post} key={uuidv4()} />})}      
</StContainer>
  

    </div>
  )
}

export default MyPageList

const StContainer = styled.div`
  margin: 0 auto;                 
  padding-left: 10px;         
`;