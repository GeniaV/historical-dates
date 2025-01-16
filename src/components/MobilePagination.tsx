import React from "react";
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;

  @media (min-width: 985px) {
    display: none;
  }
`;

const PaginationDot = styled.div<{ $isSelected: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$isSelected ? 'var(--color-base)' : '#D0D4DC'};
  opacity: ${(props) => (props.$isSelected ? 1 : 0.4)};
  margin: 0 10px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
    props.$isSelected ? 'var(--color-base)' : '#A8ACB3'};
    opacity: 1;
  }
`;

const MobilePagination: React.FC<{
  points: number;
  selectedPoint: number;
  currentStartYear: number;
  currentEndYear: number;
  handlePointClick: (point: number) => void;
}> = ({ points, selectedPoint, handlePointClick }) => {
  const pointsArray = Array.from({ length: points }, (_, i) => i + 1);

  return (
    <>
      <PaginationContainer>
        {pointsArray.map((num) => (
          <PaginationDot
            key={num}
            $isSelected={num === selectedPoint}
            onClick={() => handlePointClick(num)}
          />
        ))}
      </PaginationContainer>
    </>
  );
};

export default MobilePagination;
