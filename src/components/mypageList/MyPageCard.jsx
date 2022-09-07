import React from 'react'
import styled from 'styled-components'
const MyPageCard = ({post}) => {



  return (
    <div>
        <StTodo
        onClick={() => {
          // navigate(`/detail/${post?.id}`);
        }}
      >
        <div>날짜ㅣ {post?.date}</div>
        <hr style={{ margin: 1 }}></hr>
        <img alt="" src={post?.image} style={{width:"260px", height:"175px"}}></img>
        <hr style={{ margin: 1 }}></hr>
        <div>제목ㅣ {post?.title}</div>
        <hr style={{ margin: 1 }}></hr>
        <Sayme>
          <div>수고한 자신에게 한마디</div>
          <div>"{post?.sayme}"</div>
        </Sayme>
        <DescImg>
          <div> ..... 내 용 더 보 기</div>
        </DescImg>
      </StTodo>

    </div>
  )
}

export default MyPageCard


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
box-sizing: border-box;
/* text-align: center; */
vertical-align: top;
cursor: pointer;
&:hover{
  box-shadow: 1px 1px 10px #c4c4c4;
}
`;

const Sayme = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const DescImg = styled.div`
position: absolute;
bottom: 10px;
width: 260px;
height: 100px;

background-size: cover;
div{
  font-size: 18px;
  margin-left:11px;
  padding-left: 3px;
  margin-top: 3px;
  color: #5e5e5e;
  /* font-style: italic; */
}
`;