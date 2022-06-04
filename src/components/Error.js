
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Error = () => {
    const history = useHistory()

    return (
        <Container>
        <p style={{fontSize : "x-large", fontStyle:'bold'}}>
            앗 잠깐!!!!!
        </p>
        <p>로그인 후 글 쓰기가 가능해요!!</p>
        <Button onClick={() => {
            history.push('/login')
        }}>로그인 하러 가기</Button>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  width: 80%;
  
`;
const Button = styled.button`
  width: 50%;
  height: 50px;
  background-color: #3399ff;
  color: white;
  margin: 20px;
  font-size: 2rem;
  border: none;
  cursor: pointer;

`;
export default Error