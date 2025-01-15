import React from "react";
import styled from 'styled-components';
import { useTimeline } from '../context/TimelineContext';

const Title = styled.h1`
  font-size: 56px;
  font-weight: 700;
  line-height: 120%;
  max-width: 430px;
  position: relative;
  padding-left: 78px;
  margin: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(180deg, #3877EE 0%, #EF5DA8 100%);
  }

  @media (max-width: 978px) {
    font-size: 20px;
    max-width: 123px;
    padding-left: 20px;
    &::before {
      display: none;
    }
  }
`;

const PageTitle: React.FC = () => {
  const { pageTitle } = useTimeline();

  return <Title>{pageTitle}</Title>;
};

export default PageTitle;
