import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../GlobalStyles';
import TimelineBlock from './TimelineBlock';

const AppContainer = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
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
