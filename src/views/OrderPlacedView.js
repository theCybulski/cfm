import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { routes } from 'routes';
import { clearAppState, clearCartState, clearOrderDetails } from 'store/actions';

import Button from 'components/atoms/Button/Button';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const OrderPlacedView = ({ orderId, clearAppState, clearCartState, clearOrderDetails }) => {
  const [redirect, setRedirect] = useState(false);

  const handleRedirect = useCallback(() => {
    clearAppState();
    clearCartState();
    clearOrderDetails();

    setRedirect(true);
  }, [setRedirect, clearAppState, clearCartState, clearOrderDetails]);

  useEffect(() => {
    if (!orderId) handleRedirect();
  }, [orderId, handleRedirect]);

  return (
    <StyledWrapper>
      <h2>You order has been placed!</h2>
      {orderId && <h3>Order number: #{orderId}</h3>}
      <Button action={handleRedirect}>Go back to shopping</Button>
      {redirect && <Redirect to={routes.home} />}
    </StyledWrapper>
  );
};

OrderPlacedView.propTypes = {
  orderId: PropTypes.number,
  clearAppState: PropTypes.func.isRequired,
  clearCartState: PropTypes.func.isRequired,
  clearOrderDetails: PropTypes.func.isRequired,
};

OrderPlacedView.defaultProps = {
  orderId: null,
};

const mapStateToProps = state => {
  const { orderId } = state.orderDetails;
  return { orderId };
};

const mapDispatchToProps = dispatch => ({
  clearAppState: () => dispatch(clearAppState()),
  clearCartState: () => dispatch(clearCartState()),
  clearOrderDetails: () => dispatch(clearOrderDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlacedView);
