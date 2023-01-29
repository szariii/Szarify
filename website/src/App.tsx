import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";

//Styled Components
import GlobalCSS from "./global";

//Components
import Nav from "./components/nav/Nav";

//Sites
import LoginSite from "./sites/LoginSite";
import MainSite from "./sites/MainSite";
import AddFriendsSite from "./sites/AddFriendsSite";

//Colors https://colorhunt.co/palette/7286d38ea7e9e5e0fffff2f2

function App() {
  return (
    <>
      <GlobalCSS />
      <NavStyle />
      <Routes>
        <Route path="/" element={<LoginSite />} />
        <Route path="/main" element={<MainSite />} />
        <Route path="/addFriends" element={<AddFriendsSite />} />
      </Routes>
    </>
  );
}

const NavStyle = styled(Nav)`
  height: 20%;
`;

export default App;
