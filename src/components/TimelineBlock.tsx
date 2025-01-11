import React from 'react';
import styled from 'styled-components';

const TimelineContainer = styled.section`

`;

const Title = styled.h1`
  font-size: 56px;
  font-weight: 700;
  line-geight: 120%;
`;

const TimelineBlock = () => {

  return (
    <TimelineContainer>
      <Title>Исторические даты</Title>
    </TimelineContainer>
  );
};

export default TimelineBlock;
