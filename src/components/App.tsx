import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import GlobalStyles from '../GlobalStyles';
import { TimelineProvider } from '../context/TimelineContext';
import TimelineBlock from "./TimelineBlock";

const AppContainer = styled.main`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
  height: 100vh;
  box-sizing: border-box;
`;

export const useIsMobile = (breakpoint: number = 985) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isMobile;
};

const App = () => {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <TimelineProvider>
          <TimelineBlock />
        </TimelineProvider>
      </AppContainer>
    </>
  );
};

export default App;
