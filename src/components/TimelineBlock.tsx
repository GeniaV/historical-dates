import React from 'react';
import styled from 'styled-components';
import Circle from './Circle';

const TimelineContainer = styled.section`

`;

const Title = styled.h1`
  font-size: 56px;
  font-weight: 700;
  line-height: 120%;
  max-width: 353px;
  padding-left: 78px;
  position: relative;
  left: 16.67%;
  top: 16.38%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(180deg, #3877EE 0%, #EF5DA8 100%);
  }
  
  @media (max-width: 1400px) {
    font-size: 45px;
  }
`;

const TimelineBlock = () => {
  // const handleClick = (number: number) => {
  //   console.log(`Clicked on segment ${number}`);
  // };

  return (
    <TimelineContainer>
      <Title>Исторические даты</Title>
      {/* <ArrowButton
        size="large"
        direction="right"
        isActive={true}
        onClick={(e) => console.log('Large Arrow Clicked Righr', e)}
      />

      <ArrowButton
        size="medium"
        direction="right"
        onClick={(e) => console.log('Medium Arrow Clicked', e)}
      />

      <ArrowButton
        size="small"
        direction="right"
        isActive={true}
        onClick={(e) => console.log('Small Arrow Clicked', e)}
      /> */}


      <Circle points={6} />

    </TimelineContainer>
  );
};

export default TimelineBlock;
