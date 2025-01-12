import React, { useRef, useState, useEffect } from 'react';
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

const ExpandingCircle = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: var(--color-base);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  const [isHovered, setIsHovered] = useState(false);
  const [isNumberVisible, setIsNumberVisible] = useState(false);

  useEffect(() => {
    if (circleRef.current) {
      gsap.killTweensOf(circleRef.current);
      gsap.to(circleRef.current, {
        width: isSelected ? 56 : 6,
        height: isSelected ? 56 : 6,
        backgroundColor: isSelected
          ? 'rgba(244, 245, 249, 1)'
          : 'rgba(66, 86, 122, 1)',
        border: isSelected ? '1px solid rgba(66, 86, 122, 0.5)' : 'none',
        duration: 0.3,
        ease: 'power1.out',
      });
    }
    setIsNumberVisible(isSelected);
  }, [isSelected]);

  const handleMouseEnter = () => {
    if (isSelected) return;
    setIsHovered(true);
    gsap.to(circleRef.current, {
      width: 56,
      height: 56,
      backgroundColor: 'rgba(244, 245, 249, 1)',
      border: '1px solid rgba(66, 86, 122, 0.5)',
      duration: 0.3,
      ease: 'power1.out',
    });
    setIsNumberVisible(true);
  };

  const handleMouseLeave = () => {
    if (isSelected) return;
    setIsHovered(false);
    gsap.to(circleRef.current, {
      width: 6,
      height: 6,
      backgroundColor: 'rgba(66, 86, 122, 1)',
      border: 'none',
      duration: 0.3,
      ease: 'power1.in',
    });
    setIsNumberVisible(false);
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
      <ExpandingCircle ref={circleRef}>
        <CircleNumber $visible={isNumberVisible}>{number}</CircleNumber>
      </ExpandingCircle>
    </HoverZone>
  );
};

export default CirclePoint;
