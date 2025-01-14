import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import CirclePoint from './ui/CirclePoint';
import ArrowButton from './ui/ArrowButton';
import EventCarousel from './EventCarousel';

interface CircleProps {
  points: number;
  initialRotation?: number;
  categories: Record<number, {
    name: string;
    dateRange: string;
    events: { year: number; description: string }[];
  }>;
}

const AlignContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 56px;
  font-weight: 700;
  line-height: 120%;
  max-width: 420px;
  padding-left: 78px;
  margin: 0 20px 0 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(180deg, #3877EE 0%, #EF5DA8 100%);
  }

  @media (max-width: 1470px) {
    font-size: 20px;
    max-width: 125px;
    padding-left: 0;

    &::before {
      display: none;
    }
  }
`;

const ArrowNavigator = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 120px;
  width: 100%;
  row-gap: 20px;
  margin-left: 78px;

  @media (max-width: 985px) {
    max-width: 59px;
    row-gap: 11px;
    margin-left: 0;
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

const MobileIntervalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 273px;
  width: 100%;
  position: absolute;
  left: 50%;
  top: 22%;
  transform: translate(-50%, -50%);
`;

const CircleAlignContainer = styled.div`
  display: flex;
  padding-top: 36px;
  padding-bottom: 60px;
  position: relative;
  max-width: 550px;

  @media (max-width: 1919px) {
    display: none;
  }
`;

const CircleContainer = styled.div<{ $borderOpacity: number }>`
  width: 530px;
  height: 530px;
  border: 1px solid rgba(66, 86, 122, ${(props) => props.$borderOpacity});
  border-radius: 50%;
  background-color: transparent;

  @media (max-width: 985px) {
    display: none;
  }
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
  z-index: -1;
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

  @media (max-width: 978px) {
    font-size: 56px;
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

  @media (max-width: 978px) {
    font-size: 56px;
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

const CategoryLabel = styled.div`
  position: absolute;
  text-align: start;
  max-width: 102px;
  width: 100%;
  right: 0%;
  top: 9.3%;
  margin-left: 20px;
  font-weight: 700;
  font-size: 20px;
  color: var(--color-base);
  opacity: 0;
`;

const EventCarouselContainer = styled.div`
  grid-column: 1 / span 2;
  grid-row: 2;
  position: relative;
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-top: 56px;
  opacity: 0;
  transform: translateY(20px);
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;

  @media (min-width: 985px) {
    display: none;
  }
`;

const PaginationDot = styled.div<{ isSelected: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isSelected ? 'var(--color-base)' : '#D0D4DC'};
  opacity: ${(props) => (props.isSelected ? 1 : 0.4)};
  margin: 0 10px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
    props.isSelected ? 'var(--color-base)' : '#A8ACB3'};
    opacity: 1;
  }
`;

const Circle: React.FC<CircleProps> = ({ categories, points, initialRotation = -60 }) => {
  const radius = 265;
  const center = radius;
  const angleStep = 360 / points;
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 985);
  const [selectedPoint, setSelectedPoint] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(initialRotation);
  const [currentStartYear, setCurrentStartYear] = useState<number>(1980);
  const [currentEndYear, setCurrentEndYear] = useState<number>(1986);
  const [events, setEvents] = useState(categories[selectedPoint]?.events || []);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const pointsArray = Array.from({ length: points }, (_, i) => i + 1);

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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 985);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setEvents(categories[selectedPoint]?.events || []);
  }, [selectedPoint, categories]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power2.out' }
      );
    }
  }, [events]);

  return (
    <>
      <AlignContainer >
        <Title>Исторические даты</Title>
        <ArrowNavigator>
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
        </ArrowNavigator>
      </AlignContainer>
      {isMobile ? (
        <>
          <MobileIntervalContainer>
            <StartInterval>{currentStartYear}</StartInterval>
            <EndInterval>{currentEndYear}</EndInterval>
          </MobileIntervalContainer>
          <PaginationContainer>
            {pointsArray.map((num) => (
              <PaginationDot
                key={num}
                isSelected={num === selectedPoint}
                onClick={() => handlePointClick(num)}
              />
            ))}
          </PaginationContainer>
        </>
      ) : (
        <CircleAlignContainer>
          <CircleContainer $borderOpacity={0.5}>
            <CategoryLabel ref={labelRef}>
              {categories[selectedPoint]?.name}
            </CategoryLabel>
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
          </CircleContainer>
        </CircleAlignContainer>
      )}
      <EventCarouselContainer ref={containerRef}>
        <EventCarousel events={events} category={categories[selectedPoint]?.name} />
      </EventCarouselContainer>
    </>
  );
};

export default Circle;

