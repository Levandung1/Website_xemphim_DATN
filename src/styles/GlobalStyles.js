import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100vh;
    background: #000;
    color: #fff;
    font-family: Arial, sans-serif;
    overflow-x: auto !important; /* CHO PHÉP CUỘN NGANG */
  }

  #root {
    width: 100%;
    min-height: 100vh;
  }

  /* 🚫 XOÁ HOÀN TOÀN - ĐỪNG ĐỂ RỖNG */
`;

export default GlobalStyles;
