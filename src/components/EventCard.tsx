import React from 'react';
import styled from 'styled-components';

const EventContainer = styled.article`
  display: inline-flex;
  max-width: 320px;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  
  @media (max-width: 985px) {
    max-width: 280px;
  }
`;

const EventTitle = styled.h3`
  font-weight: 400;
  font-size: 25px;
  line-height: 120%;
  color: var(--color-blue);
  font-family: 'Bebas Neue', Arial, sans-serif;
  padding: 0;
  margin: 0;

  @media (max-width: 985px) {
    font-size: 16px;
  }
`;

const EventText = styled.p`
  font-size: 20px;
  line-height: 30px;
  padding: 0;
  margin: 0;
  height: calc(30px * 3);
  overflow: visible;
  display: block;
  white-space: normal;

  @media (max-width: 985px) {
    font-size: 14px;
    line-height: 145%;
  }
`;

interface EventCardProps {
  event: {
    year: number;
    description: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <EventContainer>
      <EventTitle>{event.year}</EventTitle>
      <EventText>{event.description}</EventText>
    </EventContainer>
  );
};

export default EventCard;

