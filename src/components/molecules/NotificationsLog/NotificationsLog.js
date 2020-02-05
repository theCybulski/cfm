import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Notification from 'components/atoms/Notification/Notification';

const StyledWrapper = styled.div`
  position: fixed;
  padding-top: 35px;
  top: 0;
  left: 150px;
  right: 150px;
  height: 350px;
  z-index: 999;
  overflow: hidden;
  pointer-events: none;

  @media (max-width: 768px) {
    left: 20px;
    right: 20px;
  }
`;

const NotificationsLog = ({ notifications }) => {
  return (
    <StyledWrapper>
      {notifications.map(({ id, type, message, duration }) => (
        <Notification key={id} id={id} type={type} duration={duration}>
          {message}
        </Notification>
      ))}
    </StyledWrapper>
  );
};

NotificationsLog.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  ).isRequired,
};

const mapStateToProps = state => {
  const { notifications } = state.appState;
  return { notifications };
};

export default connect(mapStateToProps)(NotificationsLog);
