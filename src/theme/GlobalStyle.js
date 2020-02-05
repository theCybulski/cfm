import { createGlobalStyle } from 'styled-components';
import { theme } from 'theme/mainTheme';

import GothamLightEot from '../assets/fonts/Gotham-Light/Gotham-Light.eot';
import GothamLightOtf from '../assets/fonts/Gotham-Light/Gotham-Light.otf';
import GothamLightWoff2 from '../assets/fonts/Gotham-Light/Gotham-Light.woff2';

import GothamBookEot from '../assets/fonts/Gotham-Book/Gotham-Book.eot';
import GothamBookOtf from '../assets/fonts/Gotham-Book/Gotham-Book.otf';
import GothamBookWoff2 from '../assets/fonts/Gotham-Book/Gotham-Book.woff2';

import GothamMediumEot from '../assets/fonts/Gotham-Medium/Gotham-Medium.eot';
import GothamMediumOtf from '../assets/fonts/Gotham-Medium/Gotham-Medium.otf';
import GothamMediumWoff2 from '../assets/fonts/Gotham-Medium/Gotham-Medium.woff2';

import GothamBoldEot from '../assets/fonts/Gotham-Bold/Gotham-Bold.eot';
import GothamBoldOtf from '../assets/fonts/Gotham-Bold/Gotham-Bold.otf';
import GothamBoldWoff2 from '../assets/fonts/Gotham-Bold/Gotham-Bold.woff2';

const GlobalStyle = createGlobalStyle`
  @font-face {
  font-family: "Gotham";
  src: url(${GothamLightEot});
  src: url(${GothamLightEot}) format("embedded-opentype"), url(${GothamLightWoff2}) format("woff2"), url(${GothamLightOtf}) format("opentype");
  font-style: normal;
  font-weight: 100;
}
@font-face {
  font-family: "Gotham";
  src: url(${GothamBookEot});
  src: url(${GothamBookEot}) format("embedded-opentype"), url(${GothamBookWoff2}) format("woff2"), url(${GothamBookOtf}) format("opentype");
  font-style: normal;
  font-weight: 200;
}
@font-face {
  font-family: "Gotham";
  src: url(${GothamMediumEot});
  src: url(${GothamMediumEot}) format("embedded-opentype"), url(${GothamMediumWoff2}) format("woff2"), url(${GothamMediumOtf}) format("opentype");
  font-style: normal;
  font-weight: 300;
}
@font-face {
  font-family: "Gotham";
  src: url(${GothamBoldEot});
  src: url(${GothamBoldEot}) format("embedded-opentype"), url(${GothamBoldWoff2}) format("woff2"), url(${GothamBoldOtf}) format("opentype");
  font-style: normal;
  font-weight: 400;
}

  
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html {
    font-size: 62.5%;
    background-color: ${theme.color.brownCreme};
  }
  
  body {
    margin: 0;
    padding: 0;
    font-size: 1.6rem;
    font-family: "Gotham", sans-serif;
    font-weight: 200;
  }
  
  a, a:visited, a:hover, a:active {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
