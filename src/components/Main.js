import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { loadCommentFB } from "../redux/modules/comment";
import { deletePostFB, moreloadPostFB ,heartPlusFB, heartMinusFB} from "../redux/modules/post";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.post.post_list);
  console.log(data)
  const user = auth.currentUser?.email;
  const lastdate = useSelector((state) => state.post.lastdate); // date를 기준으로 정렬해서 가져오기때문에 마지막 요소의 date를 알아야함
  const [target, setTarget] = useState(null);
  const [heartcheck, setHeartcheck] = useState(false);
  // 무한스크롤 관련 intersection observer
  const onIntersect = async ([entry], observer) => {
    //entry.isIntersecting은 내가 지금 target을 보고있니?라는 뜻 그 요소가 화면에 들어오면 true 그전엔 false
    if (entry.isIntersecting) {
      observer.unobserve(entry.target); // 이제 그 target을 보지 않겠다는 뜻
      await dispatch(moreloadPostFB(lastdate));
    }
  };
  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1,
      });
      observer.observe(target); // target을 보겠다!
    }
    return () => {
      observer && observer.disconnect();
    };
  }, [target]);
  
  return (
    <Container>
      {data.map((v, i) => {
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
                        navigate(`/update/${v.id}`);
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
                  navigate(`/detail/${v.id}`);
                }}
              >
                <p>{v.comment}</p>
                <img src={v.image} alt=""></img>
              </Layout>
              <Bottom ref={i === data.length - 1 ? setTarget : null}>
                <div>
                  <p>좋아요 {(v.heart_count).length}개</p>
                  <p>댓글 {v.comment_count}개</p>
                </div>
                {!((v.heart_count).includes(user)) ? (
                  <BsSuitHeart size="25px" onClick={() => {
                    setHeartcheck((prev) => !prev)
                    dispatch(heartPlusFB(v.id,user))}} cursor='pointer'></BsSuitHeart>
                ) : (
                  <BsSuitHeartFill color="#FF66B2" size="25px"onClick={() => {
                    setHeartcheck((prev) => !prev)
                    dispatch(heartMinusFB(v.id,user))}} cursor='pointer'></BsSuitHeartFill>
                )}
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
                        navigate(`/update/${v.id}`);
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
                  navigate(`/detail/${v.id}`);
                }}
              >
                <img src={v.image} alt=""></img>
                <p>{v.comment}</p>
              </Layout>
              <Bottom ref={i === data.length - 1 ? setTarget : null}>
                <div>
                  <p>좋아요 {(v.heart_count).length}개</p>
                  <p>댓글 {v.comment_count}개</p>
                </div>
                {!((v.heart_count).includes(user)) ? (
                  <BsSuitHeart size="25px" onClick={() => {
                    setHeartcheck((prev) => !prev)
                    dispatch(heartPlusFB(v.id,user))}} cursor='pointer'></BsSuitHeart>
                ) : (
                  <BsSuitHeartFill color="#FF66B2" size="25px"onClick={() => {
                    setHeartcheck((prev) => !prev)
                    dispatch(heartMinusFB(v.id,user))}} cursor='pointer'></BsSuitHeartFill>
                )}
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
                        navigate(`/update/${v.id}`);
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
                  navigate(`/detail/${v.id}`);
                }}
              >
                <p>{v.comment}</p>
                <img src={v.image} alt=""></img>
              </Layoutbottom>
              <Bottom ref={i === data.length - 1 ? setTarget : null}>
                <div>
                  <p>좋아요 {(v.heart_count).length}개</p>
                  <p>댓글 {v.comment_count}개</p>
                </div>
                {!((v.heart_count).includes(user)) ? (
                  <BsSuitHeart size="25px" onClick={() => {
                    setHeartcheck((prev) => !prev)
                    dispatch(heartPlusFB(v.id,user))}} cursor='pointer'></BsSuitHeart>
                ) : (
                  <BsSuitHeartFill color="#FF66B2" size="25px"onClick={() => {
                    setHeartcheck((prev) => !prev)
                    dispatch(heartMinusFB(v.id,user))}} cursor='pointer'></BsSuitHeartFill>
                )}
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
            navigate(`/write`);
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
