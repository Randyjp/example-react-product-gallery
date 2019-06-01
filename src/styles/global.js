import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 16px;
  }
  *, *:before, *:after {
    box-sizing: inherit;  
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
  }
`;

export default GlobalStyle;
