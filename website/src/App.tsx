import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Styled Components
import GlobalCSS from "./global";

//Components
import LoginSite from "./sites/LoginSite";

function App() {
  return (
    <>
      <GlobalCSS />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginSite />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
