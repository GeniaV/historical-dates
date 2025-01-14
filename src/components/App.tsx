import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../GlobalStyles';
import TimelineBlock from './TimelineBlock';

const AppContainer = styled.main`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
  height: 100vh;
  box-sizing: border-box;
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <TimelineBlock />
      </AppContainer>
    </>
  );
};

export default App;
