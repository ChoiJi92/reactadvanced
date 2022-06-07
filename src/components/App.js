import React from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "./Header";
import Login from "./Login";
import Detail from "./Detail";
import Main from "./Main";
import Signup from "./Signup";
import Write from "./Write";
import Update from "./Update";
import Error from "./Error";


import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadPostFB } from "../redux/modules/post";
import { loadUserFB } from "../redux/modules/user";



function App() {
  const [is_login, setIsLogin] = React.useState(false);
  const [is_loaded, setIsloaded] = React.useState(false);
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.currentuser)

  const loginCheck = async (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };
  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck);
  }, []);
  React.useEffect(() => {
    async function load() {
      await dispatch(loadPostFB());
      await dispatch(loadUserFB(auth.currentUser?.email));
      setIsloaded(true);
    }
    load();
  }, [dispatch]);
  return (
    <div className="App">
      <Container>{is_loaded && <Header is_login={is_login} />}</Container>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/" element={is_loaded && <Main />}></Route>
        <Route
          path="/write"
          element={is_login && is_loaded ? <Write /> : <Error />}
        ></Route>
        <Route path="/update/:id" element={is_loaded && <Update />}></Route>
        <Route
          path="/detail/:id"
          element={is_loaded && <Detail is_login={is_login} />}
        ></Route>
      </Routes>
    </div>
  );
}
const Container = styled.div`
  border-bottom: 2px solid #cce5ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: 80px;
  margin: 0 auto;
`;

export default App;
