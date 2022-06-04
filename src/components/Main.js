import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { loadCommentFB } from "../redux/modules/comment";
import { deletePostFB } from "../redux/modules/post";

const Main = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.post.post_list);
  const user = auth.currentUser?.email;
  console.log(user);
  console.log(data);
  return (
    <Container>
      {data.map((v) => {
        if (v.layout === "right") {
          return (
            <>
              <Head>
                <div>{v.user_name}</div>
                <div>{v.date}</div>
                {user === v.user_id ? (
                  <Button>
                    <button
                      onClick={() => {
                        history.push(`/update/${v.id}`);
                      }}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        dispatch(deletePostFB(v.id));
                      }}
                    >
                      삭제
                    </button>
                  </Button>
                ) : (
                  <></>
                )}
              </Head>
              <Layout
                onClick={() => {
                  console.log("클릭");
                  dispatch(loadCommentFB(v.id));
                  history.push(`/detail/${v.id}`);
                }}
              >
                <p>{v.comment}</p>
                <img src={v.image} alt=""></img>
              </Layout>
              <Bottom>
                <div>
                  <p>좋아요 0개</p>
                  <p>댓글 0개</p>
                </div>
                <p>하트</p>
              </Bottom>
            </>
          );
        } else if (v.layout === "left") {
          return (
            <>
              <Head>
                <div>{v.user_name}</div>
                <div>{v.date}</div>
                {user === v.user_id ? (
                  <Button>
                    <button
                      onClick={() => {
                        dispatch(loadCommentFB(v.id));
                        history.push(`/update/${v.id}`);
                      }}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        dispatch(deletePostFB(v.id));
                      }}
                    >
                      삭제
                    </button>
                  </Button>
                ) : (
                  <></>
                )}
              </Head>
              <Layout
                onClick={() => {
                  dispatch(loadCommentFB(v.id));
                  history.push(`/detail/${v.id}`);
                }}
              >
                <img src={v.image} alt=""></img>
                <p>{v.comment}</p>
              </Layout>
              <Bottom>
                <div>
                  <p>좋아요 0개</p>
                  <p>댓글 0개</p>
                </div>
                <p>하트</p>
              </Bottom>
            </>
          );
        } else {
          return (
            <>
              <Head>
                <div>{v.user_name}</div>
                <div>{v.date}</div>
                {user === v.user_id ? (
                  <Button>
                    <button
                      onClick={() => {
                        dispatch(loadCommentFB(v.id));
                        history.push(`/update/${v.id}`);
                      }}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        dispatch(deletePostFB(v.id));
                      }}
                    >
                      삭제
                    </button>
                  </Button>
                ) : (
                  <></>
                )}
              </Head>
              <Layoutbottom
                onClick={() => {
                  dispatch(loadCommentFB(v.id));
                  history.push(`/detail/${v.id}`);
                }}
              >
                <p>{v.comment}</p>
                <img src={v.image} alt=""></img>
              </Layoutbottom>
              <Bottom>
                <div>
                  <p>좋아요 0개</p>
                  <p>댓글 0개</p>
                </div>
                <p>하트</p>
              </Bottom>
            </>
          );
        }
      })}
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: "10px", right: "10px" }}
      >
        <EditIcon
          onClick={() => {
            history.push(`/write`);
          }}
        />
      </Fab>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 20px auto;
  width: 80%;
`;
const Button = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 30%;
  button {
    width: 100%;
    height: 30px;
    border-radius: 3px;
    background-color: #3399ff;
    border: none;
    color: white;
    cursor: pointer;
    margin-right: 10px;
  }
`;
const Head = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
export default Main;
