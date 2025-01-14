import React from 'react';
import styled from 'styled-components';
import Circle from './Circle';
import { categories } from '../staticData';

const TimelineContainer = styled.section`
  position: relative;
  width: 1440px;
  margin-left: 320px;
  margin-right: 160px;
  height: 100%;
  box-sizing: border-box;
  padding-top: 178px;
  
  display: grid;
  grid-template-rows: 2fr 1fr;
  grid-template-columns: auto 1fr;

  @media (max-width: 1919px) {
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr;
    margin-left: 20px;
    margin-right: 20px;
    padding-top: 59px;
    width: 273px;
  }
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

  .line-vertical-right {
    width: 1px;
    height: 100%;
    right: 0;
  }

  .line-vertical-center {
    width: 1px;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

  .line-horizontal-center {
    width: 100%;
    height: 1px;
    top: 44.3%;
    transform: translateY(-50%);
  }

  @media (max-width: 985px) {
    display: none;
  }
`;

const TimelineBlock = () => {
  return (
    <TimelineContainer>
      <BackgroundLines>
        <div className="line line-vertical-left" />
        <div className="line line-vertical-right" />
        <div className="line line-vertical-center" />
        <div className="line line-horizontal-center" />
      </BackgroundLines>
      <Circle points={6} categories={categories} />
    </TimelineContainer>
  );
};

export default TimelineBlock;

