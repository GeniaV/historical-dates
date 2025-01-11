import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../GlobalStyles';
import TimelineBlock from './TimelineBlock';

const AppContainer = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
`;

const BackgroundLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -100;

  .line {
    position: absolute;
    background-color: var(--color-base);
    opacity: 0.1;
  }

  .line-vertical-1 {
    width: 1px;
    height: 100%;
    left: 16.67%;
  }

  .line-vertical-2 {
    width: 1px;
    height: 100%;
    left: 54.5%;
  }

  .line-vertical-3 {
    width: 1px;
    height: 100%;
    left: 92.4%;
  }

  .line-horizontal {
    width: calc(92.4% - 16.67%);
    height: 1px;
    top: 44.17%;
    left: 16.67%;
  }

  @media (max-width: 768px) {
    .line {
      display: none;
    }
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <TimelineBlock />
        <BackgroundLines>
          <div className="line line-vertical-1" />
          <div className="line line-vertical-2" />
          <div className="line line-vertical-3" />
          <div className="line line-horizontal" />
        </BackgroundLines>
      </AppContainer>
    </>
  );
};

export default App;
