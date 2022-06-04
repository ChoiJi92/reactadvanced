import React from "react";
import styled from "styled-components";
import { IoHomeSharp } from "react-icons/io5";

import Login from "./Login";
import Detail from "./Detail";
import Main from "./Main";
import Signup from "./Signup";
import Write from "./Write";
import Update from "./Update";
import Error from "./Error";

import { auth } from "../firebase";
import { async } from "@firebase/util";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadPostFB } from "../redux/modules/post";
import { loadUserFB } from "../redux/modules/user";
import Header from "./Header";

function App() {
  const history = useHistory();
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
      <Container>
       {is_loaded && <Header is_login={is_login}/>}
      </Container>
      <Switch>
        <Route path="/login" exact>
          <Login/>
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/" exact>
          { is_loaded && <Main />}
        </Route>
        <Route path="/write" exact>
          {is_login && is_loaded ? <Write /> : <Error />}
        </Route>
        <Route path="/update/:id" exact>
          {is_login && is_loaded && <Update />}
        </Route>
        <Route path="/detail/:id" exact>
          {is_login && is_loaded && <Detail />}
        </Route>
      </Switch>
    </div>
  );
}
const Container = styled.div`
  border-bottom: 2px solid #cce5ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
`;
// const Button = styled.div`
//   width: 20%;
//   button {
//     cursor: pointer;
//     margin-right: 20px;
//     width: 30%;
//     height: 30px;
//     background-color: #3399ff;
//     color: white;
//     border: none;
//   }
// `;
export default App;
