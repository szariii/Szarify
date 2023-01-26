import React from "react";
import { Link, Route, Switch } from "react-router-dom";

//Styled Components
import GlobalCSS from "./global";

//Components
import Nav from "./components/nav/Nav";

//Sites
import LoginSite from "./sites/LoginSite";
import styled from "styled-components";

//Colors https://colorhunt.co/palette/7286d38ea7e9e5e0fffff2f2

function App() {
  return (
    <>
      <GlobalCSS />
      <NavStyle />
      <Switch>
        <Route exact path="/" component={LoginSite} />
      </Switch>
    </>
  );
}

const NavStyle = styled(Nav)`
  height: 20%;
`;

export default App;
