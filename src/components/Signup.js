import React from "react";
import styled from "styled-components";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createUserFB } from "../redux/modules/user";

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = React.useRef();
  const nickname = React.useRef();
  const password = React.useRef();
  const passwordcheck = React.useRef();
  const signupFB = async () => {
    const isValidEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const isValidPw = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    if (
      isValidEmail.test(id.current.value) &&
      isValidPw.test(password.current.value)
    ) {
      if (password.current.value === passwordcheck.current.value) {
        const user = await createUserWithEmailAndPassword(
          auth,
          id.current.value,
          password.current.value
        );
        await dispatch(
          createUserFB({
            user_id: id.current.value,
            name: nickname.current.value,
          })
        );
        history.push("/");
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } else {
      alert("아이디와 비밀번호를 확인 해 주세요!");
    }
  };

  return (
    <div>
      <Container>
        <div style={{ color: "#0000FF", fontSize: "2rem" }}>회원가입</div>
        <Input>
          <label htmlFor="input-id">아이디</label>
          <br />
          <input ref={id} id="input-id" type="email" required></input>
          <p>아이디는 이메일 형식으로 작성해 주세요!</p>
        </Input>
        <Input>
          <label htmlFor="input-name">닉네임</label>
          <br />
          <input ref={nickname} id="input-name" type="email" required></input>
        </Input>
        <Input>
          <label htmlFor="input-password">비밀번호</label>
          <br />
          <input
            ref={password}
            id="input-password"
            type="password"
            required
          ></input>
          <p>비밀번호는 8 ~ 10자 영문, 숫자 조합으로 입력해 주세요</p>
        </Input>
        <Input>
          <label htmlFor="input-passwordcheck">비밀번호 확인</label>
          <br />
          <input
            ref={passwordcheck}
            id="input-passwordcheck"
            type="password"
            required
          ></input>
        </Input>
        <Button onClick={signupFB}>회원가입</Button>
      </Container>
    </div>
  );
};
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
  color: #0080ff;
  font-size: 1.5rem;
  width: 30%;

  p{
    color: gray;
    font-size: medium;
  }
  input {
    width: 100%;
    height: 20px;
    border: none;
    border-bottom: 2px solid #cce5ff;
  }
  & input:focus {
    outline: none;
    border-bottom: 2px solid #66b2ff;
  }
`;
const Button = styled.button`
  width: 30%;
  height: 50px;
  background-color: #3399ff;
  color: white;
  margin: 20px;
  font-size: 2rem;
  border: none;
  cursor: pointer;
`;
export default Signup;
