import React, { useState } from 'react';
import styled from 'styled-components';
import CirclePoint from './ui/CirclePoint';
import { categories } from '../staticData';

interface CircleProps {
  points: number;
}

const CircleContainer = styled.div<{ $borderOpacity: number }>`
  position: absolute;
  left: 54.5%;
  top: 44.17%;
  transform: translate(-50%, -50%);
  width: 530px;
  height: 530px;
  border: 1px solid rgba(66, 86, 122, ${(props) => props.$borderOpacity});
  border-radius: 50%;
  background-color: transparent;

  @media (max-width: 768px) {
    display: none;
  }
`;

const PointContainer = styled.div<{ $left: string; $top: string }>`
  position: absolute;
  left: ${(props) => props.$left};
  top: ${(props) => props.$top};
  transform: translate(-50%, -50%);
`;

const CategoryLabel = styled.div`
  position: absolute;
  transform: translate(56%, 45%);
  margin-left: 20px;
  font-weight: 700;
  font-size: 20px;
  color: var(--color-base);
`;

const Circle: React.FC<CircleProps> = ({ points }) => {
  const radius = 265;
  const center = radius;
  const [selectedPoint, setSelectedPoint] = useState<number | null>(1);

  const handlePointClick = (number: number) => {
    setSelectedPoint((prev) => (prev === number ? null : number));
  };

  const pointsArray = Array.from({ length: points }, (_, i) => i + 1);

  const adjustedNumbers = pointsArray.map(
    (num, index) => pointsArray[(index + 1) % points]
  );

  return (
    <CircleContainer $borderOpacity={0.5}>
      {pointsArray.map((num, index) => {
        const angle = ((2 * Math.PI * index) / points);
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);

        const displayedNumber = adjustedNumbers[index];

        return (
          <PointContainer
            key={num}
            $left={`${x}px`}
            $top={`${y}px`}
          >
            {selectedPoint === displayedNumber && (
              <CategoryLabel>
                {categories[selectedPoint]}
              </CategoryLabel>
            )}
            <CirclePoint
              number={displayedNumber}
              onClick={handlePointClick}
              isSelected={selectedPoint === displayedNumber}
            />
          </PointContainer>
        );
      })}
    </CircleContainer>
  );
};

export default Circle;
