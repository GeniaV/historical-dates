import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import CircleNavigator from './CircleNavigator';
import SegmentSwitcher from './SegmentSwitcher';
import MobilePagination from './MobilePagination';
import Interval from './Interval';
import PageTitle from './PageTitle';
import EventCarousel from './EventCarousel';
import { useTimeline } from '../context/TimelineContext';
import { useIsMobile } from './App';
import CategoryTitle from './CategoryTitle';
import styled from 'styled-components';

const IntervalContainerMobile = styled.div`
  display: flex;
  margin: 56px 0 56px 0;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 0 20px 0 20px;
`;

const BackgroundLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #C7CDD9;
  margin-top: 20px; 
`;

const AlignContainer = styled.div`
  display: flex;
  margin-top: 78px;
  padding-left: 20px;
  column-gap: 38px;
`;

const CircleContainerDesktop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  justify-content: center;

  @media (max-width: 978px) {
    display: none;
  }
`;

const IntervalWrapper = styled.div`
  margin-top: 20px;
  position: absolute;
  z-index: -1;
  max-width: 973px;
  width: 100%;
`;

const CircleNavigatorWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const HorizontalLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--color-base);
  opacity: 0.1;
  pointer-events: none;
  transform: translateY(-50%);
`;

const SwithcerContainerDescktop = styled.div`
  padding-left: 84px;
`;

const Desktop = styled.div`
  padding-top: 170px;
  display: grid;

    @media (max-width: 1592px) {
    display: none;
  }
`;

const TimelineComponent: React.FC = () => {
  const isMobile = useIsMobile();
  const [rotation, setRotation] = useState<number>(-60);
  const [currentStartYear, setCurrentStartYear] = useState<number>(1980);
  const [currentEndYear, setCurrentEndYear] = useState<number>(1986);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const { segments, currentSegmentId, setCurrentSegmentId } = useTimeline();
  const categoryRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const points = Object.keys(segments).length;
  const angleStep = 360 / points;

  const handlePointClick = (clickedId: number) => {
    if (currentSegmentId === clickedId) return;

    const currentIndex = parseInt(currentSegmentId.toString()) - 1;
    const clickedIndex = clickedId - 1;

    let diff = clickedIndex - currentIndex;

    if (Math.abs(diff) > points / 2) {
      diff = diff > 0 ? diff - points : diff + points;
    }

    const newRotation = rotation - diff * angleStep;
    setRotation(newRotation);
    animateYears(
      segments[currentSegmentId]?.dateRange || '',
      segments[clickedId]?.dateRange || ''
    );
    setCurrentSegmentId(clickedId);
  };


  const handleArrowClick = (direction: 'left' | 'right') => {
    let newPoint = direction === 'right' ? parseInt(currentSegmentId.toString()) - 1 : parseInt(currentSegmentId.toString()) + 1;

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
  }, [currentSegmentId]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power2.out' }
      );
    }
  }, [segments[currentSegmentId].events]);


  useEffect(() => {
    if (categoryRef.current) {
      gsap.fromTo(
        categoryRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }
      );
    }

    if (carouselRef.current) {
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.2,
        }
      );
    }
  }, [currentSegmentId]);


  return (
    <div>
      {!isMobile &&
        <Desktop>
          <PageTitle />
          <CircleContainerDesktop>
            <CircleNavigatorWrapper>
              <HorizontalLine />
              <CircleNavigator
                points={points}
                rotation={rotation}
                selectedPoint={parseInt(currentSegmentId.toString())}
                handlePointClick={handlePointClick}
                ref={wrapperRef}
                currentSegment={segments[currentSegmentId]}
              />
            </CircleNavigatorWrapper>
            <IntervalWrapper>
              <Interval
                startYear={currentStartYear}
                endYear={currentEndYear}
              />
            </IntervalWrapper>
          </CircleContainerDesktop>
          <SwithcerContainerDescktop>
            <SegmentSwitcher
              points={points}
              selectedPoint={parseInt(currentSegmentId.toString())}
              handleArrowClick={direction => handleArrowClick(direction)}
            />
          </SwithcerContainerDescktop>
          <div ref={carouselRef}>
            <EventCarousel currentCategory={segments[currentSegmentId]} />
          </div>
        </Desktop>
      }
      {isMobile && (
        <>
          <PageTitle />
          <IntervalContainerMobile>
            <Interval
              startYear={currentStartYear}
              endYear={currentEndYear}
            />
          </IntervalContainerMobile>
          <div ref={categoryRef}>
            <CategoryContainer>
              <CategoryTitle currentSegment={segments[currentSegmentId]} />
              <BackgroundLine />
            </CategoryContainer>
          </div>
          <div ref={carouselRef}>
            <EventCarousel currentCategory={segments[currentSegmentId]} />
          </div>
          <AlignContainer>
            <SegmentSwitcher
              points={points}
              selectedPoint={parseInt(currentSegmentId.toString())}
              handleArrowClick={direction => handleArrowClick(direction)}
            />
            <MobilePagination
              points={points}
              selectedPoint={parseInt(currentSegmentId.toString())}
              currentStartYear={currentStartYear}
              currentEndYear={currentEndYear}
              handlePointClick={id => handlePointClick(id)}
            />
          </AlignContainer>
        </>
      )}
    </div>
  );
};

export default TimelineComponent;