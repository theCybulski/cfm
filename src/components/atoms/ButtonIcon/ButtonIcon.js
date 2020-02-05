import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledIcon = styled.div`
  content: '';
  width: 100%;
  height: 100%;
  mask: url(${({ icon }) => icon}) no-repeat center;
  mask-size: 25px;
  background: ${({ theme }) => theme.color.black};
  transition: background 0.2s ease-out;
`;

const StyledWrapper = styled.button`
  position: relative;
  background: transparent;
  border: none;
  width: 50px;
  height: 50px;
  padding: 0;
  cursor: pointer;

  &:hover {
    ${StyledIcon} {
      background: ${({ theme }) => theme.color.brown};
    }
  }

  &:focus {
    outline: none;
  }

  ${({ small }) =>
    small &&
    css`
      width: 25px;
      height: 25px;

      ${StyledIcon} {
        mask-size: 12px;
      }
    `};
`;

const ButtonIcon = ({ icon, children, action, small }) => (
  <StyledWrapper onClick={action} small={small}>
    <StyledIcon icon={icon} />
    {children}
  </StyledWrapper>
);

ButtonIcon.propTypes = {
  action: PropTypes.func,
  icon: PropTypes.string,
  children: PropTypes.node,
  small: PropTypes.bool,
};

ButtonIcon.defaultProps = {
  action: () => {},
  icon: '',
  children: '',
  small: false,
};

export default ButtonIcon;
