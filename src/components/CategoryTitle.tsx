import React, { useEffect, useRef } from "react";
import styled from 'styled-components';
import gsap from 'gsap';
import { useTimeline } from '../context/TimelineContext';
import { useIsMobile } from './App';

const CategoryLabel = styled.p`
  max-width: 102px;
  width: 100%;
  margin: 0;
  padding: 0;
  font-weight: 700;
  font-size: 20px;
  color: var(--color-base);
  display: flex;
  opacity: 0;

  @media (max-width: 978px) {
    font-size: 14px;
    max-width: 123px;
  }
`;

const CategoryTitle: React.FC = () => {
  const { currentCategory, currentSegmentId } = useTimeline();
  const labelRef = useRef<HTMLParagraphElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (labelRef.current) {
      const animationConfig = isMobile
        ? { opacity: 0, y: 20 }
        : { opacity: 0, y: 0 };

      gsap.fromTo(
        labelRef.current,
        animationConfig,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        }
      );
    }
  }, [currentSegmentId, isMobile]);

  return <CategoryLabel ref={labelRef}>{currentCategory.name}</CategoryLabel>;
};

export default CategoryTitle;
