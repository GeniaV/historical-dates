import React from 'react';
import styled from 'styled-components';

const EventContainer = styled.article`
  max-width: 320px;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 15px;

  @media (max-width: 985px) {
    max-width: 166px;
  }
`;

const EventTitle = styled.h3`
  font-weight: 400;
  font-size: 25px;
  line-height: 120%;
  color: var(--color-blue);
  font-family: 'Bebas Neue', Arial, sans-serif; 
  margin: 0;
  padding: 0;

  @media (max-width: 985px) {
    font-size: 16px;
  }
`;

const EventText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 20px;
  line-height: 30px;

  @media (max-width: 985px) {
    font-size: 14px;
    line-height: 145%;
  }
`;

interface EventProps {
  year: number;
  description: string;
}

const EventCard: React.FC<EventProps> = ({ year, description }) => {
  return (
    <EventContainer>
      <EventTitle>{year}</EventTitle>
      <EventText>{description}</EventText>
    </EventContainer>
  );
}

export default EventCard;
