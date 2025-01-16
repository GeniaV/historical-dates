import React from "react";
import styled from 'styled-components';
import ArrowButton from "./ui/ArrowButton";
import { useIsMobile } from "./App";

const SegmentSwitcherContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 120px;
  width: 100%;
  row-gap: 20px;
  margin: 0; 

  @media (max-width: 985px) {
    max-width: 59px;
    row-gap: 11px;
  }
`;

const ArrowNavigatorText = styled.p`
  font-size: 14px;
  line-height: 100%;
  margin: 0;
  padding: 0;
`;

const ArrowsContainer = styled.div`
  display: flex;
  column-gap: 20px;

  @media (max-width: 985px) {
   column-gap: 8px;
  }
`;

const formatSegment = (current: number, total: number): string => {
  return `${String(current).padStart(2, '0')}/${String(total).padStart(2, '0')}`;
};

const SegmentSwitcher: React.FC<{
  selectedPoint: number;
  points: number;
  handleArrowClick: (direction: 'left' | 'right') => void;
}> = ({ selectedPoint, points, handleArrowClick }) => {
  const isMobile = useIsMobile();

  return (
    <SegmentSwitcherContainer>
      <ArrowNavigatorText>
        {formatSegment(selectedPoint, points)}
      </ArrowNavigatorText>
      <ArrowsContainer>
        <ArrowButton
          size={!isMobile ? "large" : "small"}
          direction="right"
          isActive={selectedPoint === 1 ? false : true}
          onClick={() => handleArrowClick('right')}
        />
        <ArrowButton
          size={!isMobile ? "large" : "small"}
          direction="left"
          isActive={selectedPoint === points ? false : true}
          onClick={() => handleArrowClick('left')}
        />
      </ArrowsContainer>
    </SegmentSwitcherContainer>);
};

export default SegmentSwitcher;
