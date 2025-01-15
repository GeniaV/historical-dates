import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --color-base: #42567a;
    --color-blue: #3877ee;
    --color-pink: #ef5da8;
    --color-gray: #303e58;
    --backgroud-color: #f4f5f9;
  }

  @font-face {
    font-family: 'PT Sans';
    font-weight: 700;
    src: 
      url('/assets/fonts/PTSans-Bold.woff2') format('woff2'),
      url('/assets/fonts/PTSans-Bold.woff') format('woff');
      url('/assets/fonts/PTSans-Bold.ttf') format('truetype'),
      url('/assets/fonts/PTSans-Bold.eot') format('eot');
  }

  @font-face {
    font-family: 'PT Sans';
    font-weight: 400;
    src: 
      url('/assets/fonts/PTSans-Regular.woff2') format('woff2'),
      url('/assets/fonts/PTSans-Regular.woff') format('woff');
      url('/assets/fonts/PTSans-Regular.ttf') format('truetype'),
      url('/assets/fonts/PTSans-Regular.eot') format('eot');
  }

  @font-face {
    font-family: 'Bebas Neue';
    font-weight: 400;
    src: 
      url('/assets/fonts/BebasNeue-Regular.woff2') format('woff2'),
      url('/assets/fonts/BebasNeue-Regular.woff') format('woff');
      url('/assets/fonts/BebasNeue-Regular.ttf') format('truetype'),
      url('/assets/fonts/BebasNeue-Regular.eot') format('eot');
  }

  body {
    max-width: 1920px;
    min-width: 320px;
    background: var(--backgroud-color);
    color: var(--color-base);
    margin: 0;
    padding: 0 0 0 320px;
    font-family: 'PT Sans', Arial, sans-serif; 

    @media (max-width: 985px) {
     padding: 59px 0 13px 0;
    }
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
