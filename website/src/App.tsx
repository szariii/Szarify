import React from "react";
import { Link, Route, Switch } from "react-router-dom";

//Styled Components
import GlobalCSS from "./global";

//Components
import LoginSite from "./sites/LoginSite";

function App() {
  return (
    <>
      <GlobalCSS />
      <Switch>
        <Route exact path="/" component={LoginSite} />
      </Switch>
    </>
  );
}

export default App;
