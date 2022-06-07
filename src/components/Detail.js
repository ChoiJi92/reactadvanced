import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { createCommentFB, loadCommentFB } from "../redux/modules/comment";
import Commentlist from "./Commentlist";
import { countFB, heartPlusFB, heartMinusFB } from "../redux/modules/post";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { auth } from "../firebase";
import Slide from "./Slide";
import BottomSlide from "./BottomSlide";

const Detail = ({ is_login }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [isloaded, setIsloaded] = useState(false);
  const [comment, setComment] = useState();
  const data = useSelector((state) => state.post.post_list).filter(
    (v) => v.id === params.id
  );
  const onChange = (e) => {
    setComment(e.target.value);
  };
  const user = useSelector((state) => state.user.currentuser);
  const user_id = auth.currentUser?.email;
  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  const addcomment = async () => {
    if (comment !== "") {
      await dispatch(
        createCommentFB({
          id: params.id,
          user_name: user,
          comment: comment,
          date: now,
        })
      );
      await dispatch(countFB(params.id));
      setComment("");
    }
  };
  useEffect(() => {
    async function load() {
      await dispatch(loadCommentFB(params.id));
      setIsloaded(true);
    }
    load();
  }, []);
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
            {/* <img src={data[0].image} alt=""></img> */}
            <div>
              <Slide data={data[0].image} />
            </div>
          </Layout>
          <Bottom>
            <div>
              <p>좋아요 {data[0].heart_count.length}개</p>
              <p>댓글 {data[0].comment_count}개</p>
            </div>
            {!data[0].heart_count.includes(user_id) ? (
              <BsSuitHeart
                size="25px"
                onClick={() => {
                  dispatch(heartPlusFB(data[0].id, user_id));
                }}
                cursor="pointer"
              ></BsSuitHeart>
            ) : (
              <BsSuitHeartFill
                color="#FF66B2"
                size="25px"
                onClick={() => {
                  dispatch(heartMinusFB(data[0].id, user_id));
                }}
                cursor="pointer"
              ></BsSuitHeartFill>
            )}
          </Bottom>
        </>
      ) : data[0].layout === "left" ? (
        <>
          <Head>
            <div>{data[0].user_name}</div>
            <div>{data[0].date}</div>
          </Head>
          <Layout>
            {/* <img src={data[0].image} alt=""></img> */}
            <Slide data={data[0].image} />
            <p>{data[0].comment}</p>
          </Layout>
          <Bottom>
            <div>
              <p>좋아요 {data[0].heart_count.length}개</p>
              <p>댓글 {data[0].comment_count}개</p>
            </div>
            {!data[0].heart_count.includes(user_id) ? (
              <BsSuitHeart
                size="25px"
                onClick={() => {
                  dispatch(heartPlusFB(data[0].id, user_id));
                }}
                cursor="pointer"
              ></BsSuitHeart>
            ) : (
              <BsSuitHeartFill
                color="#FF66B2"
                size="25px"
                onClick={() => {
                  dispatch(heartMinusFB(data[0].id, user_id));
                }}
                cursor="pointer"
              ></BsSuitHeartFill>
            )}
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
            {/* <img src={data[0].image} alt=""></img> */}
            <BottomSlide data={data[0].image} />
          </Layoutbottom>
          <Bottom>
            <div>
              <p>좋아요 {data[0].heart_count.length}개</p>
              <p>댓글 {data[0].comment_count}개</p>
            </div>
            {!data[0].heart_count.includes(user_id) ? (
              <BsSuitHeart
                size="25px"
                onClick={() => {
                  dispatch(heartPlusFB(data[0].id, user_id));
                }}
                cursor="pointer"
              ></BsSuitHeart>
            ) : (
              <BsSuitHeartFill
                color="#FF66B2"
                size="25px"
                onClick={() => {
                  dispatch(heartMinusFB(data[0].id, user_id));
                }}
                cursor="pointer"
              ></BsSuitHeartFill>
            )}
          </Bottom>
        </>
      )}
      {is_login && (
        <>
          <input
            value={comment}
            onChange={onChange}
            placeholder="댓글 내용을 입력하세요  :)"
          ></input>
          <Btn onClick={addcomment}>추가</Btn>
        </>
      )}
      {isloaded && <Commentlist />}
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
`;
const Btn = styled.button`
  width: 100%;
  height: 40px;
  background-color: #3399ff;
  color: white;
  font-size: large;
  border: none;
  cursor: pointer;
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
  }
`;
const Bottom = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  p {
    display: inline;
    margin: 10px;
  }
`;
export default Detail;
