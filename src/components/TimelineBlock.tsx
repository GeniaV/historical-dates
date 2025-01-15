import React from 'react';
import styled from 'styled-components';
import TimelineComponent from './TimelineComponent';
import { useIsMobile } from './App';

const TimelineContainer = styled.section`
  max-width: 1440px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
`;

const BackgroundLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;

  .line {
    position: absolute;
    background-color: var(--color-base);
    opacity: 0.1;
  }

  .line-vertical-left {
    width: 1px;
    height: 100%;
    left: 0;
  }
  
  .line-vertical-middle {
    width: 1px;
    height: 100%;
    left: 50%;
  }


  .line-vertical-right {
    width: 1px;
    height: 100%;
    right: 0;
  }
`;

const TimelineBlock = () => {
  const isMobile = useIsMobile();
  
  return (
    <TimelineContainer>
      <TimelineComponent />
      {!isMobile && <BackgroundLines>
        <div className="line line-vertical-left" />
        <div className="line line-vertical-middle" />
        <div className="line line-vertical-right" />
      </BackgroundLines>}
    </TimelineContainer>
  );
};

export default TimelineBlock;
