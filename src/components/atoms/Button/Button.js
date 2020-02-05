import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledWrapper = styled.button`
  position: relative;
  font-family: 'Gotham', sans-serif;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.05em;
  padding: 15px 35px;
  border-radius: 60px;
  border: none;
  background: ${({ theme }) => theme.color.green};
  color: ${({ theme }) => theme.color.white};
  cursor: pointer;
  z-index: 0;
  ${({ elWidth }) =>
    elWidth &&
    css`
      width: ${elWidth};
    `};

  &:before {
    content: '';
    position: absolute;
    left: -4px;
    top: -4px;
    width: calc(100% + 8px);
    height: calc(100% + 8px);
    border-radius: 60px;
    background: ${({ theme }) => theme.color.greenLight};
    opacity: 0.7;
    z-index: -1;
    transform: scale(0.9);
    transition: transform 0.2s ease-out;
  }

  &:focus {
    outline: none;
    &:before {
      transform: scale(1);
    }
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.xs};
    padding: 10px 20px;

    &:before {
      display: none;
    }
  }
`;

const Button = ({ action, children, elWidth, disabled }) => (
  <StyledWrapper onClick={action} elWidth={elWidth} disabled={disabled}>
    {children}
  </StyledWrapper>
);

Button.propTypes = {
  action: PropTypes.func,
  children: PropTypes.node.isRequired,
  elWidth: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  action: () => {},
  elWidth: '',
  disabled: false,
};

export default Button;
