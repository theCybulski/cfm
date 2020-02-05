import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.color.brown};

  ${({ small }) =>
    small &&
    css`
      font-size: ${({ theme }) => theme.fontSize.m};
      justify-content: flex-start;
    `}

  ${({ locked }) =>
    locked &&
    css`
      font-size: ${({ theme }) => theme.fontSize.l};
      justify-content: flex-end;
    `}
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.l};
  }
`;

const StyledCurrency = styled.span`
  font-size: 0.5em;
  font-weight: ${({ theme }) => theme.fontWeight.book};
  padding: 0.3em 0 0 0.4em;
  color: ${({ theme }) => theme.color.brownLight};

  ${({ small }) =>
    small &&
    css`
      font-size: 0.8em;
      padding: 0 0 0 0.3em;
    `}
`;

const PriceHolder = ({ price, small, noWeight, locked }) => (
  <StyledWrapper small={small} locked={locked}>
    {price}
    <StyledCurrency small={small}>€{!noWeight && '/kg'}</StyledCurrency>
  </StyledWrapper>
);

PriceHolder.propTypes = {
  small: PropTypes.bool,
  noWeight: PropTypes.bool,
  locked: PropTypes.bool,
  price: PropTypes.string.isRequired,
};

PriceHolder.defaultProps = {
  small: false,
  noWeight: false,
  locked: false,
};

export default PriceHolder;
