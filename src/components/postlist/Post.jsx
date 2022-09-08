import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import descImage1 from '../../assets/images/descImage1.png'
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";

function Post({post}) {
  const navigate = useNavigate();

    return (
      <StTodo
        onClick={() => {
          navigate(`/detail/${post?.id}`);
        }}
      >
        <div>날짜ㅣ {post?.date}</div>
        <hr style={{ margin: 1 }}></hr>
        <img alt="" src={post?.imageURL} style={{width:"260px", height:"175px"}}></img>
        <hr style={{ margin: 1 }}></hr>
        <div>제목ㅣ {post?.title}</div>
        <hr style={{ margin: 1 }}></hr>
        <Sayme>
          <div>수고한 자신에게 한마디</div>
          <div>
            <button style={{border:'transparent'}} disabled><RiDoubleQuotesL size='15' color='#3d3d3d'/></button>
            {post?.sayMe}
            <button style={{border:'transparent'}} disabled><RiDoubleQuotesR size='15' color='#3d3d3d'/></button>
          </div>
        </Sayme>
        <DescImg>
          <div> ....  더 보 기</div>
        </DescImg>
      </StTodo>
    );
}

export default Post;

const StTodo = styled.div`
  position: relative;
  border-radius: 7px;
  border: 2px solid #b6b6b6;
  background-color: white;
  margin: 10px 10px;
  padding: 5px;
  word-wrap: break-word;
  width: 275px;
  height: 400px;

  display: inline-block;
  font-size: 17px;
  font-weight: bolder;
  box-sizing: border-box;
  vertical-align: top;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 20px #b8b8b8;
    transform: scale(1.03);
    transition: transform 0.2s ease 0.1s;
  }
`;

const Sayme = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  div {
    margin: 0 auto;
  }
`;

const DescImg = styled.div`
  position: absolute;
  bottom: 10px;
  width: 260px;
  height: 100px;
  background-image: url(${descImage1});
  background-size: cover;
  div {
    font-size: 18px;
    margin-left: 11px;
    padding-left: 3px;
    margin-top: 3px;
    color: #5e5e5e;
  }
`;
