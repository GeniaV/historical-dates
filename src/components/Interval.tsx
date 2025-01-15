import React, { useRef } from "react";
import styled from "styled-components";

interface IntervalProps {
  startYear: number;
  endYear: number;
  isMobile: boolean;
}

const IntervalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 973px;
  with: 100%;
  z-index: -1;
  margin: 0 auto; 

  @media (max-width: 978px) {
    column-gap: 30px;
    max-width: 273px;
    z-index: 1;
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
    font-size: 56px};
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
    font-size: 56px};
  }
`;

const Interval: React.FC<IntervalProps> = ({ startYear, endYear, isMobile }) => {
  const startRef = useRef<HTMLParagraphElement>(null);
  const endRef = useRef<HTMLParagraphElement>(null);

  return (
    <IntervalContainer >
      <StartInterval>
        {startYear}
      </StartInterval>
      <EndInterval>
        {endYear}
      </EndInterval>
    </IntervalContainer>
  );
};

export default Interval;
