import React from "react";
import moment from "moment";
import { auth } from "../firebase";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import { async } from "@firebase/util";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updatePostFB } from "../redux/modules/post";
import styled from "styled-components";

const Update = () => {
  const params = useParams();
  const data = useSelector((state) => state.post.post_list).filter(
    (v) => v.id === params.id
  );
  console.log(data);
  const dispatch = useDispatch();
  const history = useHistory();
  const storage = getStorage();
  const user = useSelector((state) => state.user.currentuser);
  const [image, setImage] = React.useState(data[0].image);
  const [posting, setPosting] = React.useState(data[0].comment);
  const [input, setInput] = React.useState(data[0].comment);
  const [layout, setLayout] = React.useState();
  const comments = React.useRef();
  const uploadImage = async (e) => {
    const uploaded_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );
    console.log(uploaded_file);

    const file_url = await getDownloadURL(uploaded_file.ref);
    console.log(file_url);
    setImage(file_url);
  };
  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  const updatecomment = () => {
    dispatch(
      updatePostFB({
        id: params.id,
        date: now,
        image: image,
        comment: comments.current.value,
        user_id: auth.currentUser?.email,
        user_name: user,
        layout: layout,
      })
    );
    history.goBack();
  };
  const onChange = (e) => {
    setPosting(e.target.value);
    setInput(e.target.value);
  };
  return (
    <Container>
      <Head>
        <div>게시글 작성</div>
        <label htmlFor="upload">파일 선택</label>
        <input type="file" id="upload" onChange={uploadImage}></input>
      </Head>
      <Ridio check={layout}>
        <input
          type="radio"
          id="right"
          value="right"
          checked={layout === "right"}
          readOnly
          onClick={() => setLayout("right")}
        ></input>
        <label htmlFor="right" onClick={() => setLayout("right")}>
          오른쪽에 이미지 왼쪽에 텍스트
        </label>
      </Ridio>
      <Layout>
        <p>{posting}</p>
        <img src={image} alt=""></img>
      </Layout>
      <Ridio check={layout}>
        <input
          type="radio"
          id="left"
          value="left"
          checked={layout === "left"}
          readOnly
          onClick={() => setLayout("left")}
        ></input>
        <label htmlFor="left" onClick={() => setLayout("left")}>
          왼쪽에 이미지 오른쪽에 텍스트
        </label>
      </Ridio>
      <Layout>
        <img src={image} alt=""></img>
        <p>{posting}</p>
      </Layout>
      <Ridio check={layout}>
        <input
          type="radio"
          id="bottom"
          value="bottom"
          checked={layout === "bottom"}
          readOnly
          onClick={() => setLayout("bottom")}
        ></input>
        <label htmlFor="bottom" onClick={() => setLayout("bottom")}>
          하단에 이미지 상단에 텍스트
        </label>
      </Ridio>
      <Layoutbottom>
        <p>{posting}</p>
        <img src={image} alt=""></img>
      </Layoutbottom>
      <Comment>
        <label htmlFor="comment">게시물 내용</label>
        <br />
        <textarea
          id="comment"
          ref={comments}
          onChange={onChange}
          value={input}
        ></textarea>
      </Comment>
      <Button disabled={!image || !layout || !posting ? true : false } onClick={updatecomment}>게시글 수정</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 20px auto;
  width: 80%;
`;

const Head = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: large;
  margin-bottom: 20px;
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
const Ridio = styled.div`
  color: ${(props) => (props.check ? "blue" : "black")};
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
    background-image: url(https://user-images.githubusercontent.com/75834421/124501682-fb25fd00-ddfc-11eb-93ec-c0330dff399b.jpg);
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
    height: 100vh;
    background-image: url(https://user-images.githubusercontent.com/75834421/124501682-fb25fd00-ddfc-11eb-93ec-c0330dff399b.jpg);
    background-size: cover;
  }
`;
const Comment = styled.div`
  width: 100%;
  margin: 20px 0;
  & > textarea {
    width: 100%;
    height: 200px;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 20px;
  background-color: ${(props) => props.disabled ? '#99CCFF' : '#3399ff'};
  color: white;
  border: none;
  font-size: large;
`;
export default Update;
