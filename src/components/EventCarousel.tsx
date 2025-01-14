import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styled from 'styled-components';
import ArrowButton from './ui/ArrowButton';
import EventCard from './EventCard';

interface EventCarouselProps {
  events: {
    year: number;
    description: string;
  }[],
  category: string;
}

const ArrowWrapper = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 25%;
  transform: translateY(-50%);
  ${(props) => (props.$position === 'left' ? 'left: 0;' : 'right: 0;')};
  z-index: 10;
`;

const SwiperContainer = styled.div`
  position: relative;
  max-width: 1200px;
  width: 100%;

  @media (max-width: 985px) {
    max-width: 320px;
  }
`;

const CategoryLabel = styled.div`
  max-width: 280px;
  width: 100%;
  font-weight: 700;
  font-size: 14px;
  color: var(--color-base);
  padding-bottom: 20px;
  border-bottom: 1px solid #C7CDD9;
`;

const SlidePrevButton: React.FC<{
  disabled: boolean;
  swiper: any;
}> = ({ disabled, swiper }) => (
  <ArrowWrapper $position="left">
    <ArrowButton
      size="medium"
      direction="left"
      onClick={() => swiper.slidePrev()}
      isActive={!disabled}
    />
  </ArrowWrapper>
);

const SlideNextButton: React.FC<{
  disabled: boolean;
  swiper: any;
}> = ({ disabled, swiper }) => (
  <ArrowWrapper $position="right">
    <ArrowButton
      size="medium"
      direction="right"
      onClick={() => swiper.slideNext()}
      isActive={!disabled}
    />
  </ArrowWrapper>
);

const EventCarousel: React.FC<EventCarouselProps> = ({ events, category }) => {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 985);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 985);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.update();
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);
    }
  }, [events, swiperInstance]);

  return (
    <>

      {!isMobile && swiperInstance && !isBeginning && (
        <SlidePrevButton disabled={isBeginning} swiper={swiperInstance} />
      )}
      <SwiperContainer>
        {isMobile &&
          <CategoryLabel>{category}</CategoryLabel>
        }
        <Swiper
          style={{ marginTop: '20px' }}
          spaceBetween={isMobile ? 25 : 80}
          slidesPerView={isMobile ? 2 : 3}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSwiper={(swiper) => {
            setSwiperInstance(swiper);
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {events.map((event, index) => (
            <SwiperSlide key={index}>
              <EventCard year={event.year} description={event.description} />
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>
      {!isMobile && swiperInstance && !isEnd && (
        <SlideNextButton disabled={isEnd} swiper={swiperInstance} />
      )}
    </>
  );
};

export default EventCarousel;
