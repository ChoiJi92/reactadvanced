import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { createCommentFB, loadCommentFB } from "../redux/modules/comment";
const Detail = ({is_login}) => {
  const params = useParams();
  const comment = useRef();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.post.post_list).filter(
    (v) => v.id === params.id
  );
  console.log(data[0].user_name)
  const user = useSelector((state)=>state.user.currentuser)
  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  const addcomment = () => {
    if (comment.current.value !== "") {
      dispatch(
        createCommentFB({
          id: params.id,
          user_name: data[0].user_name,
          comment: comment.current.value,
          date: now,
        })
      );
    }
  };
  const comment_list = useSelector((state)=> state.comment.comment_list)
  console.log(comment_list)
  return (
    <Container>
      {data[0].layout === "right" ? (
        <>
          <Head>
            <div>{data[0].user_name}</div>
            <div>{data[0].date}</div>
          </Head>
          <Layout>
            <p>{data[0].comment}</p>
            <img src={data[0].image} alt=""></img>
          </Layout>
          <Bottom>
            <div>
              <p>좋아요 0개</p>
              <p>댓글 {comment_list.length}개</p>
            </div>
            <p>하트</p>
          </Bottom>
        </>
      ) : data[0].layout === "left" ? (
        <>
          <Head>
            <div>{data[0].user_name}</div>
            <div>{data[0].date}</div>
          </Head>
          <Layout>
            <img src={data[0].image} alt=""></img>
            <p>{data[0].comment}</p>
          </Layout>
          <Bottom>
            <div>
              <p>좋아요 0개</p>
              <p>댓글 0개</p>
            </div>
            <p>하트</p>
          </Bottom>
        </>
      ) : (
        <>
          <Head>
            <div>{data[0].user_name}</div>
            <div>{data[0].date}</div>
          </Head>
          <Layoutbottom>
            <p>{data[0].comment}</p>
            <img src={data[0].image} alt=""></img>
          </Layoutbottom>
          <Bottom>
            <div>
              <p>좋아요 0개</p>
              <p>댓글 0개</p>
            </div>
            <p>하트</p>
          </Bottom>
        </>
      )}
      {is_login && <>
      <input ref={comment} placeholder="댓글 내용을 입력하세요  :)"></input>
      <button onClick={addcomment}>추가</button>
      </>}
      {comment_list.map(v => {
          return(
          <Comment>
              <p>{v.user_name}</p>
              <p>{v.comment}</p>
              <p>{v.date}</p>
          </Comment>
          )
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px 20px;
  margin: 20px auto;
  width: 80%;

  input {
    width: 100%;
    height: 50px;
  }
  button {
    width: 100%;
    height: 40px;
    background-color: #3399ff;
    color: white;
    font-size: large;
    border: none;
    cursor: pointer;
  }
`;
const Head = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: large;
  & > label {
    width: 70px;
    position: relative;
    border: solid 1px;
    padding: 5px;
  }
  & > input {
    display: none;
  }
`;
const Layout = styled.div`
  margin-top: 20px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  & > p {
    text-align: center;
    word-break: break-all;
    width: 80%;
    margin: 20px;
  }
  & > img {
    width: 400px;
    height: 400px;
    background-size: cover;
  }
`;
const Layoutbottom = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;

  & > p {
    word-break: break-all;
    width: 80%;
    margin: 20px;
  }
  & > img {
    width: 100%;
    height: 50vh;
    background-size: cover;
  }
`;
const Comment =styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
`
const Bottom = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  p {
    display: inline;
    margin: 10px;
  }
`;
export default Detail;
