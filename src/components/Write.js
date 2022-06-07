import React from "react";
import moment from "moment";
import { auth, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { async } from "@firebase/util";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPostFB } from "../redux/modules/post";
import styled from "styled-components";
import Slide from "./Slide";
import BottomSlide from "./BottomSlide";

const Write = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentuser);
  const [image, setImage] = React.useState([]);
  const [fileList, setFileList] = React.useState([])
  const comments = React.useRef();
  const [posting, setPosting] = React.useState();
  const [layout, setLayout] = React.useState();
  const uploadImage = (e) => {
    let imagelist = [];
    let filelist = [];
    for (let i = 0; i < e.target.files.length; i++) {
      console.log(e.target.files);
      filelist[i] = e.target.files[i]
      
      let reader = new FileReader();    // 이미지 미리보기!!!
      reader.readAsDataURL(e.target.files[i]);
      reader.onload = () => {
        imagelist[i] = reader.result
        setImage([...imagelist])
      }; 
    }
    setFileList([...filelist])
  };


  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  const addpost = async () => {
    let realImage =[]
    for(let i = 0; i<fileList.length; i++){
    const uploaded_file = await uploadBytes(
        ref(storage, `images/${fileList[i].name}`),
        fileList[i]
      );
      console.log(uploaded_file);
      const file_url = await getDownloadURL(uploaded_file.ref);
      console.log(file_url);
      realImage.push(file_url)
    }
    await dispatch(
      createPostFB({
        date: now,
        image: realImage,
        comment: comments.current.value,
        user_id: auth.currentUser?.email,
        user_name: user,
        layout: layout,
        comment_count: 0,
        heart_count: [],
      })
    );
    navigate("/");
  };
  const onChange = (e) => {
    setPosting(e.target.value);
  };
  return (
    <Container>
      <Head>
        <div>게시글 작성</div>
        <label htmlFor="upload">파일 선택</label>
        <input type="file" multiple id="upload" onChange={uploadImage}></input>
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
        {/* <img
          src={image[0]}
          alt=""
        ></img> */}
        {image && <Slide data={image} />}
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
        <Slide data={image} />
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
        <BottomSlide data={image} />
      </Layoutbottom>
      <Comment>
        <label htmlFor="comment">게시물 내용</label>
        <br />
        <textarea id="comment" ref={comments} onChange={onChange}></textarea>
      </Comment>
      <Button
        disabled={!image || !layout || !posting ? true : false}
        onClick={addpost}
      >
        게시글 작성
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
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
  margin-top: 100px;
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
const Comment = styled.div`
  width: 100%;
  margin-top: 60px;
  & > textarea {
    width: 100%;
    height: 200px;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 20px;
  background-color: ${(props) => (props.disabled ? "#99CCFF" : "#3399ff")};
  color: white;
  border: none;
  font-size: large;
  cursor: pointer;
`;
export default Write;
