import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import CirclePoint from './ui/CirclePoint';
import ArrowButton from './ui/ArrowButton';

interface CircleProps {
  points: number;
  initialRotation?: number;
  categories: Record<number, {
    name: string;
    dateRange: string;
    events: { year: number; description: string }[];
  }>;
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

  @media (max-width: 985px) {
    display: none;
  }
`;

const CategoryLabel = styled.div`
  position: absolute;
  text-align: start;
  max-width: 125px;
  width: 100%;
  left: 81%;
  top: 3.5%;
  margin-left: 20px;
  font-weight: 700;
  font-size: 20px;
  color: var(--color-base);
  opacity: 0;
`;

const RotatingWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const PointContainer = styled.div<{ $left: string; $top: string }>`
  position: absolute;
  left: ${(props) => props.$left};
  top: ${(props) => props.$top};
  transform: translate(-50%, -50%);
`;

const IntervalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  column-gap: 125px;

  @media (max-width: 985px) {
    display: none;
  }
`;

const StartInterval = styled.p`
  font-size: 200px;
  font-weight: 700;
  color: var(--color-blue);
  line-height: 100%;
  letter-spacing: -4px;
  margin: 0;
  padding: 0;

  @media (max-width: 1176px) {
    font-size: 150px;
  }
`;

const EndInterval = styled.p`
  font-size: 200px;
  font-weight: 700;
  color: var(--color-pink);
  line-height: 100%;
  letter-spacing: -4px;
  margin: 0;
  padding: 0;

  @media (max-width: 1176px) {
    font-size: 150px;
  }
`;

const ArrowNavigator = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 120px;
  width: 100%;
  row-gap: 20px;
  position: relative;
  left: 20.7%;
   top: calc(100px + 34vh);

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

const Circle: React.FC<CircleProps> = ({ categories, points, initialRotation = -60 }) => {
  const radius = 265;
  const center = radius;
  const angleStep = 360 / points;

  const [selectedPoint, setSelectedPoint] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(initialRotation);
  const [currentStartYear, setCurrentStartYear] = useState<number>(1980);
  const [currentEndYear, setCurrentEndYear] = useState<number>(1986);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const pointsArray = Array.from({ length: points }, (_, i) => i + 1);

  useEffect(() => {
    if (wrapperRef.current) {
      gsap.set(wrapperRef.current, {
        rotation: rotation,
      });
    }
  }, []);

  useEffect(() => {
    if (wrapperRef.current) {
      gsap.to(wrapperRef.current, {
        rotation: rotation,
        duration: 0.8,
        ease: 'power2.inOut',
      });
    }
  }, [rotation]);

  useEffect(() => {
    if (labelRef.current) {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          delay: 1,
          ease: 'power2.out',
        }
      );
    }
  }, [selectedPoint]);

  const formatSegment = (current: number, total: number): string => {
    return `${String(current).padStart(2, '0')}/${String(total).padStart(2, '0')}`;
  };

  const handlePointClick = (clickedNumber: number) => {
    if (selectedPoint === clickedNumber) return;

    const currentIndex = selectedPoint - 1;
    const clickedIndex = clickedNumber - 1;

    let diff = clickedIndex - currentIndex;

    if (Math.abs(diff) > points / 2) {
      diff = diff > 0 ? diff - points : diff + points;
    }

    const newRotation = rotation - diff * angleStep;

    setRotation(newRotation);
    animateYears(categories[selectedPoint]?.dateRange || '', categories[clickedNumber]?.dateRange || '');
    setSelectedPoint(clickedNumber);
  };

  const handleArrowClick = (direction: 'left' | 'right') => {
    let newPoint = direction === 'right' ? selectedPoint - 1 : selectedPoint + 1;

    if (newPoint < 1) {
      newPoint = points;
    } else if (newPoint > points) {
      newPoint = 1;
    }

    handlePointClick(newPoint);
  };

  const animateYears = (currentRange: string, nextRange: string) => {
    const [currentStart, currentEnd] = currentRange.split('-').map(Number);
    const [nextStart, nextEnd] = nextRange.split('-').map(Number);

    gsap.to({ value: currentStart }, {
      value: nextStart,
      duration: 0.8,
      ease: 'none',
      onUpdate: function () {
        setCurrentStartYear(Math.round(this.targets()[0].value));
      },
    });

    gsap.to({ value: currentEnd }, {
      value: nextEnd,
      duration: 0.8,
      ease: 'none',
      onUpdate: function () {
        setCurrentEndYear(Math.round(this.targets()[0].value));
      },
    });
  };

  return (
    <>
      <CircleContainer $borderOpacity={0.5}>
        <IntervalContainer>
          <StartInterval>{currentStartYear}</StartInterval>
          <EndInterval>{currentEndYear}</EndInterval>
        </IntervalContainer>

        <RotatingWrapper ref={wrapperRef}>
          {pointsArray.map((num, index) => {
            const angle = (360 / points) * index;
            const x = center + radius * Math.cos((angle * Math.PI) / 180);
            const y = center + radius * Math.sin((angle * Math.PI) / 180);

            return (
              <PointContainer
                key={num}
                $left={`${x}px`}
                $top={`${y}px`}
              >
                <div
                  style={{
                    transform: `rotate(${-rotation}deg)`
                  }}
                >
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
        <CategoryLabel ref={labelRef}>
          {categories[selectedPoint]?.name}
        </CategoryLabel>
      </CircleContainer>
      <ArrowNavigator>
        <ArrowNavigatorText>
          {formatSegment(selectedPoint, points)}
        </ArrowNavigatorText>
        <ArrowsContainer>
          <ArrowButton
            size="large"
            direction="right"
            isActive={selectedPoint === 1 ? false : true}
            onClick={() => handleArrowClick('right')}
          />
          <ArrowButton
            size="large"
            direction="left"
            isActive={selectedPoint === points ? false : true}
            onClick={() => handleArrowClick('left')}
          />
        </ArrowsContainer>
      </ArrowNavigator>
    </>
  );
};

export default Circle;
