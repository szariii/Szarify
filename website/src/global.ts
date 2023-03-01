import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html{
    font-size: 20px;
    ::-webkit-scrollbar {
    background-color: #e5e0ff;
  }

  ::-webkit-scrollbar-thumb {
    background: #7286d3;
    border-radius: 20px;
  }
}

h1{
    font-size: 4rem;
    color: #7286D3;
}

h2{
    font-size: 2rem;
    color: #7286D3;
}

h3{
    font-size: 1.5rem;
    color: #7286D3;
}

body{
    background-color: #FFF2F2;
}

@media only screen and (max-width: 1100px) {
  html{
    font-size: 14px;
  }
}

@media only screen and (max-width: 800px) {
  h2{
    font-size: 1.5rem;
  }
}


`;
