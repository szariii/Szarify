import React, { useEffect } from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import useCookies from "react-cookie/cjs/useCookies";
import { CookiesProvider } from "react-cookie";
import axios from "axios";

//Redux
import type { RootState } from "./store/store";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "./store/slicers/userDataSlicer";
import { change } from "./store/slicers/loginSlicer";

//Styled Components
import GlobalCSS from "./global";

//Components
import Nav from "./components/nav/Nav";

//Sites
import LoginSite from "./sites/LoginSite";
import MainSite from "./sites/MainSite";
import AddFriendsSite from "./sites/AddFriendsSite";
import UserProfilSite from "./sites/UserProfilSite";
import AddPostSite from "./sites/AddPostSite";

//Colors https://colorhunt.co/palette/7286d38ea7e9e5e0fffff2f2

function App() {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const userData = useSelector((state: RootState) => state.userData);
  useEffect(() => {
    if (userData.id === -1 && cookies.user) {
      setUser();
    }
  }, []);

  const setUser = async () => {
    const dataToSend = {
      id: cookies.user,
    };

    const result = await axios.get(
      "http://127.0.0.1:3000/getUserData",
      {params:dataToSend}
    );
    dispatch(setUserData(result.data));
    dispatch(change());
  };

  return (
    <>
      <GlobalCSS />
      <NavStyle />
      <CookiesProvider />
      <Routes>
        <Route path="/" element={<LoginSite />} />
        <Route path="/main" element={<MainSite />} />
        <Route path="/addFriends" element={<AddFriendsSite />} />
        <Route path="/user/:id" element={<UserProfilSite />} />
        <Route path="/addPost" element={<AddPostSite />} />
      </Routes>
    </>
  );
}

const NavStyle = styled(Nav)`
  height: 20%;
`;

export default App;
