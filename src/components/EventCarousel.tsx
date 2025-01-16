import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styled from 'styled-components';
import ArrowButton from './ui/ArrowButton';
import EventCard from './EventCard';
import { useIsMobile } from './App';

const EventCarouselContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  max-width: 1440px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  justify-items: center;
  margin: 56px auto 0 auto; 

  @media (max-width: 1270px) {
    justify-content: flex-start;
     margin: 20px auto 0 auto; 
  }
`;

const ArrowWrapper = styled.div<{ $position: 'left' | 'right' }>`
  ${(props) => (props.$position === 'left' ? 'left: 0;' : 'right: 0;')};

  @media (max-width: 1270px) {
    display: none;
  }
`;

const SwiperContainer = styled.div`
  justify-content: center;
  display: flex;
  max-width: 1200px;
  width: 100%;
  cursor: pointer;

  .swiper-slide {
    @media (max-width: 985px) {
      margin-right: -20px;
    }
  }

  .swiper-slide:first-child {
    @media (max-width: 985px) {
      margin-left: 20px;
    }
  }

  .swiper-wrapper {
    @media (max-width: 985px) {
      margin-left: 0;
      width: calc(100% + 20px);
    }
  }
`;

type Event = {
  year: number;
  description: string;
};

type Category = {
  name: string;
  dateRange: string;
  events: Event[];
};

type EventCarouselProps = {
  currentCategory: Category;
};

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

const EventCarousel: React.FC<EventCarouselProps> = ({ currentCategory }) => {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const isMobile = useIsMobile();

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.update();
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);
    }
  }, [currentCategory.events, swiperInstance]);

  return (
    <EventCarouselContainer>
      {!isMobile && <SlidePrevButton disabled={isBeginning} swiper={swiperInstance} />}
      <SwiperContainer>
        <Swiper
          initialSlide={0}
          slideToClickedSlide={true}
          spaceBetween={isMobile ? 25 : 80}
          slidesPerView={isMobile ? 1.2 : 3}
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
          {currentCategory.events.map((event, index) => (
            <SwiperSlide
              key={index}
              style={
                index === 0
                  ? { marginLeft: isMobile ? '20px' : '0px' }
                  : {}
              }
            >
              <EventCard event={event} />
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>
      {!isMobile && <SlideNextButton disabled={isEnd} swiper={swiperInstance} />}
    </EventCarouselContainer>
  );
};

export default EventCarousel;

