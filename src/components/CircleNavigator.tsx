import React, { forwardRef } from "react";
import styled from "styled-components";
import CirclePoint from "./ui/CirclePoint";
import CategoryTitle from "./CategoryTitle";

const CircleContainer = styled.div<{ $borderOpacity: number }>`
  width: 530px;
  height: 530px;
  border: 1px solid rgba(66, 86, 122, ${(props) => props.$borderOpacity});
  border-radius: 50%;
  background-color: transparent;
  position: relative;
  margin: 0 auto;
  @media (max-width: 985px) {
    display: none;
  }
`;

const RotatingWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  @media (max-width: 985px) {
    display: none;
  }
`;

const PointContainer = styled.div<{ $left: string; $top: string }>`
  position: absolute;
  left: ${(props) => props.$left};
  top: ${(props) => props.$top};
  transform: translate(-50%, -50%);
`;

type CircleNavigatorProps = {
  points: number;
  rotation: number;
  selectedPoint: number;
  handlePointClick: (point: number) => void;
  currentSegment: {
    name: string;
    dateRange: string;
  };
};

const CircleNavigator = forwardRef<HTMLDivElement, CircleNavigatorProps>(
  ({ points, rotation, selectedPoint, handlePointClick, currentSegment }, ref) => {
    const radius = 265;
    const center = radius;

    const pointsArray = Array.from({ length: points }, (_, i) => i + 1);

    return (
      <CircleContainer $borderOpacity={0.5}>
        <RotatingWrapper ref={ref} style={{ transform: `rotate(${rotation}deg)` }}>
          {pointsArray.map((num, index) => {
            const angle = (360 / points) * index;
            const x = center + radius * Math.cos((angle * Math.PI) / 180);
            const y = center + radius * Math.sin((angle * Math.PI) / 180);

            return (
              <PointContainer key={num} $left={`${x}px`} $top={`${y}px`}>
                <div style={{ transform: `rotate(${-rotation}deg)` }}>
                  <CirclePoint
                    number={num}
                    onClick={() => handlePointClick(num)}
                    isSelected={selectedPoint === num}
                  />
                </div>
              </PointContainer>
            );
          })}
        </RotatingWrapper>
        <CategoryTitle currentSegment={currentSegment} />
      </CircleContainer>
    );
  }
);

CircleNavigator.displayName = "CircleNavigator";

export default CircleNavigator;
