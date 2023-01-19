import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Components
import LoginSite from "./sites/LoginSite";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
