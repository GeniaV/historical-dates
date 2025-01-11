import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

interface CirclePointProps {
  number: number;
  onClick: (number: number) => void;
  isSelected: boolean;
}

const HoverZone = styled.div`
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
`;

const ExpandingCircle = styled.div<{ $isSelected: boolean }>`
  position: absolute;
  width: ${(props) => (props.$isSelected ? '56px' : '6px')};
  height: ${(props) => (props.$isSelected ? '56px' : '6px')};
  background-color: ${(props) =>
    props.$isSelected ? 'rgba(244, 245, 249, 1)' : 'var(--color-base)'};
  border: ${(props) =>
    props.$isSelected ? '1px solid rgba(66, 86, 122, 0.5)' : 'none'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
`;

const CircleNumber = styled.span<{ $visible: boolean }>`
  font-size: 20px;
  font-weight: 400;
  color: var(--color-base);
  display: ${(props) => (props.$visible ? 'block' : 'none')};
  pointer-events: none;
`;

const CirclePoint: React.FC<CirclePointProps> = ({
  number,
  onClick,
  isSelected,
}) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const [isNumberVisible, setIsNumberVisible] = useState(false);

  const handleMouseEnter = () => {
    gsap.killTweensOf(circleRef.current);
    gsap.killTweensOf(setIsNumberVisible);
    if (isSelected) return;

    const timeline = gsap.timeline();

    timeline
      .to(circleRef.current, {
        width: 56,
        height: 56,
        backgroundColor: 'rgba(244, 245, 249, 1)',
        border: '1px solid rgba(66, 86, 122, 0.5)',
        duration: 0.05,
        ease: 'power1.out',
        onUpdate: () => {
          const currentWidth = gsap.getProperty(circleRef.current, 'width') as number;

          if (currentWidth >= 30) {
            setIsNumberVisible(true);
          }
        },
      });
  };

  const handleMouseLeave = () => {
    gsap.killTweensOf(circleRef.current);
    gsap.killTweensOf(setIsNumberVisible);
    if (isSelected) return;

    const timeline = gsap.timeline();

    timeline
      .to(circleRef.current, {
        width: 6,
        height: 6,
        backgroundColor: 'rgba(66, 86, 122, 1)',
        border: 'none',
        duration: 0.05,
        ease: 'power1.in',
        onStart: () => {
          setIsNumberVisible(false);
        },
      });
  };

  const handleClick = () => {
    onClick(number);
  };

  return (
    <HoverZone
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <ExpandingCircle ref={circleRef} $isSelected={isSelected}>
        <CircleNumber $visible={isSelected || isNumberVisible}>
          {number}
        </CircleNumber>
      </ExpandingCircle>
    </HoverZone>
  );
};

export default CirclePoint;
