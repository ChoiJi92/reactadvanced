import React, { useState } from "react";
import styled from "styled-components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUserFB } from "../redux/modules/user";

const Login = () => {
    // const id = React.useRef()
    // const password = React.useRef()
    const dispatch = useDispatch()
    const history = useHistory()
    const [id, setId] = useState()
    const [password, setPassword] = useState()
    const loginFB = async () => {
        const user = await signInWithEmailAndPassword(
            auth,
            id,
            password
        )
        await dispatch(loadUserFB(auth.currentUser?.email));
            console.log(user)
            history.push('/')
        
    }
  
    return (
        <Container>
            <div style={{color:'#0000FF', fontSize:'2rem'}}>로그인</div>
        <Input>
          <label htmlFor="input-id">아이디</label>
          <input  id="input-id" type='email' onChange={(e)=>{
            setId(e.target.value)
          }} placeholder="아이디를 입력해 주세요!" required></input>
        </Input>
        <Input>
          <label htmlFor="input-password">비밀번호</label>
          <input  id="input-password" type='password' onChange={(e)=>{
            setPassword(e.target.value)}} placeholder="비밀번호를 입력해 주세요!" required></input>
        </Input>
       <Button disabled={id ==='' || password === "" ? true : false} onClick={loginFB}>로그인</Button>
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
const Input = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  color: #0080FF;
  font-size: 1.5rem;
  width: 30%;

  input {
    width: 100%;
    height: 20px;
    border: none;
    border-bottom: 2px solid #CCE5FF;
  }
  & input:focus {
    outline: none;
    border-bottom: 2px solid #66B2FF;
  }
`;
const Button = styled.button`
  width: 30%;
  height: 50px;
  /* background-color: #3399ff; */
  color: white;
  margin: 20px;
  font-size: 2rem;
  border: none;
  cursor: pointer;
  background-color: ${(props)=>props.disabled ?  '#99CCFF' : '#3399ff'};
`;

export default Login ;