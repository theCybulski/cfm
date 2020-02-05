import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { removeNotification } from 'store/actions';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  position: relative;
  width: 768px;
  margin: 0 auto 20px;
  padding-right: 80px;
  background: ${({ theme }) => theme.color.white};
  border-radius: 8px;
  overflow: hidden;
  animation: fadeIn linear 0.2s forwards;

  @keyframes fadeIn {
    from {
      transform: translateY(-25px);
      opacity: 0;
    }
    to {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(25px);
      opacity: 0;
    }
  }

  ${({ isRemoving }) =>
    isRemoving &&
    css`
      animation: fadeOut linear 0.2s forwards;
    `};

  ${({ notifType }) => {
    switch (notifType) {
      case 'success':
        return css`
          box-shadow: 0 10px 30px -10px rgba(054, 206, 105, 0.2);
        `;
      case 'info':
        return css`
          box-shadow: 0 10px 30px -10px rgba(189, 136, 110, 0.2);
        `;
      case 'error':
        return css`
          box-shadow: 0 10px 30px -10px rgba(219, 58, 48, 0.2);
        `;
      default:
        return css`
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.2);
        `;
    }
  }};

  @media (max-width: 768px) {
    width: 100%;
    padding-right: 55px;
  }
`;

const StyledMessage = styled.div`
  padding: 20px;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSize.s};

  ${({ notifType }) => {
    switch (notifType) {
      case 'success':
        return css`
          color: ${({ theme }) => theme.color.green};
        `;
      case 'info':
        return css`
          color: ${({ theme }) => theme.color.brown};
        `;
      case 'error':
        return css`
          color: ${({ theme }) => theme.color.red};
        `;
      default:
        return css`
          color: ${({ theme }) => theme.color.black};
        `;
    }
  }};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.xs};
    padding: 10px 15px;
  }
`;

const StyledButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 70px;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.color.white};
  background: ${({ theme }) => theme.color.greyLight};
  pointer-events: auto;
  transition: opacity 0.2s ease-out;

  &:hover {
    opacity: 0.92;
  }

  &:focus {
    outline: none;
  }

  ${({ notifType }) => {
    switch (notifType) {
      case 'success':
        return css`
          background: ${({ theme }) => theme.color.green};
        `;
      case 'info':
        return css`
          background: ${({ theme }) => theme.color.brown};
        `;
      case 'error':
        return css`
          background: ${({ theme }) => theme.color.red};
        `;
      default:
        return css`
          background: ${({ theme }) => theme.color.grey};
        `;
    }
  }};

  @media (max-width: 768px) {
    width: 45px;
  }
`;

const Notification = ({ id, type, duration, children, removeNotification }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = useCallback(() => {
    setIsRemoving(true);
    setTimeout(() => removeNotification(id), 200);
  }, [id, removeNotification]);

  /* eslint-disable consistent-return */
  useEffect(() => {
    // if duration equals 0, notification is persistent and can be removed manually only
    if (duration !== 0) {
      const autoDestroy = setTimeout(handleRemove, duration);
      return () => clearTimeout(autoDestroy);
    }
  }, [duration, handleRemove]);
  /* eslint-enable */

  return (
    <StyledWrapper notifType={type} isRemoving={isRemoving}>
      <StyledMessage notifType={type}>{children}</StyledMessage>
      <StyledButton notifType={type} onClick={handleRemove}>
        X
      </StyledButton>
    </StyledWrapper>
  );
};

Notification.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  children: PropTypes.string.isRequired,
  duration: PropTypes.number,
  removeNotification: PropTypes.func.isRequired,
};

Notification.defaultProps = {
  type: '',
  duration: 2500,
};

const mapStateToProps = state => {
  const { notifications } = state.appState;
  return { notifications };
};

const mapDispatchToProps = dispatch => ({
  removeNotification: id => dispatch(removeNotification(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
