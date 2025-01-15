import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

interface ArrowButtonProps {
  size: 'large' | 'medium' | 'small';
  direction: 'left' | 'right';
  isActive?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const sizes = {
  large: {
    dimension: '50px',
    svg: (
      <svg
        width="10"
        height="14"
        viewBox="0 0 10 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.49988 0.750001L2.24988 7L8.49988 13.25"
          stroke="#42567A"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  medium: {
    dimension: '40px',
    svg: (
      <svg
        width="8"
        height="12"
        viewBox="0 0 8 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2" />
      </svg>
    ),
  },
  small: {
    dimension: '25px',
    svg: (
      <svg
        width="6"
        height="9"
        viewBox="0 0 6 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.7489 1.375L1.6239 4.5L4.7489 7.625"
          stroke="#42567A"
          strokeWidth="2"
        />
      </svg>
    ),
  },
};

const Button = styled.button<Pick<ArrowButtonProps, 'size' | 'direction'>>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transform: ${(props) =>
    props.direction === 'left' ? 'rotate(180deg)' : 'none'};
  transition: all 0.3s ease;

  ${(props) =>
    props.size === 'large' &&
    css`
      width: ${sizes.large.dimension};
      height: ${sizes.large.dimension};
      border: 1px solid rgba(66, 86, 122, 0.5);
      background: none;

      &:active {
        background: white;
      }

      &:hover {
        background: white;
      }

      @media (max-width: 985px) {
        width: ${sizes.small.dimension};
        height: ${sizes.small.dimension};

        svg {
          width: 6px;
          height: 9px;
        }
      }
    `}

  ${(props) =>
    props.size === 'small' &&
    css`
      width: ${sizes.small.dimension};
      height: ${sizes.small.dimension};
      border: 1px solid rgba(66, 86, 122, 0.5);
      background: none;

      &:hover,
      &:active {
        background: white;
      }
    `}

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.3;
      cursor: not-allowed;
    `}

  ${(props) =>
    props.size === 'medium' &&
    css`
      width: ${sizes.medium.dimension};
      height: ${sizes.medium.dimension};
      background: white;
      box-shadow: 0 0 15px rgba(56, 119, 238, 0.1);
      border: none;
     `}
`;

const ArrowButton = forwardRef<HTMLButtonElement, ArrowButtonProps>(
  ({ size, direction, isActive = true, onClick }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isActive) {
        onClick(e);
      }
    };

    if (size === 'medium' && !isActive) {
      return null;
    }

    return (
      <Button
        size={size}
        direction={direction}
        disabled={!isActive}
        onClick={handleClick}
        ref={ref}
      >
        {sizes[size].svg}
      </Button>
    );
  }
);

ArrowButton.displayName = 'ArrowButton';

export default ArrowButton;
