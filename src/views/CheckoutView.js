import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { routes } from 'routes';
import { placeOrder, fillOrderDetails, setCheckoutStep, generateNotification } from 'store/actions';
import {
  CHECKOUT_STEP_PERSONAL,
  CHECKOUT_STEP_SHIPPING,
  CHECKOUT_STEP_FINAL,
} from 'store/constants';

import ProductsListMini from 'components/organisms/ProductsListMini/ProductsListMini';
import FormCheckoutPersonal from 'components/molecules/FormCheckout/FormCheckoutPersonal';
import FormCheckoutShipping from 'components/molecules/FormCheckout/FormCheckoutShipping';
import Button from 'components/atoms/Button/Button';
import Container from 'components/atoms/Container/Container';

const StyledWrapper = styled.div`
  padding-bottom: 100px;
`;

const StyledContainer = styled(Container)`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledMainContainer = styled.div`
  width: 60%;
  padding-right: 50px;

  @media (max-width: 768px) {
    padding: 30px 0 0;
    width: 100%;
    order: 2;
  }
`;

const StyledSideBarWrapper = styled.div`
  width: 40%;

  @media (max-width: 768px) {
    width: 100%;
    order: 1;
  }
`;

const StyledSideBar = styled.div`
  border-radius: 10px;
  background: ${({ theme }) => theme.color.white};
  overflow: hidden;

  h2 {
    margin: 0 0 30px;
    padding: 30px;
    border-bottom: 2px solid ${({ theme }) => theme.color.brownCreme};
  }
`;

const StyledTotalPrice = styled.div`
  padding: 30px;
  border-top: 2px solid ${({ theme }) => theme.color.brownCreme};
  display: flex;
  justify-content: space-between;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.color.white};
  background: ${({ theme }) => theme.color.brownLight};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.l};
  }
`;

const StyledTabsWrapper = styled.div``;

const StyledTab = styled.div`
  border-radius: 10px;
  background: ${({ theme }) => theme.color.white};
  overflow: hidden;
`;

const StyledTabBody = styled.div`
  padding: 30px;
  border-bottom: 4px solid ${({ theme }) => theme.color.brownCreme};

  ${({ active }) =>
    !active &&
    css`
      padding: 0;
      display: none;
    `}
`;

const StyledTabHeader = styled.div`
  position: relative;
  padding: 30px;
  border-bottom: 2px solid ${({ theme }) => theme.color.brownCreme};
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontWeight.bold};

  h3 {
    margin: 0;
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const StyledButtonEdit = styled.button`
  position: absolute;
  background: none;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  padding: 5px 10px;
  font-size: ${({ theme }) => theme.fontSize.s};
  border: none;
  color: ${({ theme }) => theme.color.brownLight};
  border-bottom: 1px solid ${({ theme }) => theme.color.brownLight};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.brown};
    border-bottom: 1px solid ${({ theme }) => theme.color.brown};
  }
`;

const StyledPlaceOrder = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 30px;
`;

const CheckoutView = ({
  productsInCart,
  cartTotalPrice,
  orderId,
  checkoutStep,
  personalDetails,
  shippingDetails,
  fillOrderDetails,
  setCheckoutStep,
  placeOrder,
  generateNotification,
}) => {
  const handleOrderDetails = (type, nextStep, payload) => {
    fillOrderDetails({ type, payload });
    if (nextStep) setCheckoutStep(nextStep);
  };

  const handlePlaceOrder = () => {
    const products = productsInCart.map(({ name, sku, price, qty }) => ({ name, sku, price, qty }));

    const order = {
      cartTotalPrice,
      products,
      personalDetails,
      shippingDetails,
    };

    if (products.length) {
      placeOrder(order);
    } else {
      generateNotification({
        type: 'error',
        message: 'Add any products to your cart first.',
      });
    }
  };

  return (
    <StyledWrapper>
      <Container>
        <h1>Checkout</h1>
      </Container>
      <StyledContainer>
        <StyledMainContainer>
          <StyledTabsWrapper>
            <StyledTab>
              <StyledTabHeader>
                <h3>1. Personal details</h3>
                {personalDetails.firstName && (
                  <StyledButtonEdit onClick={() => setCheckoutStep(CHECKOUT_STEP_PERSONAL)}>
                    Edit
                  </StyledButtonEdit>
                )}
              </StyledTabHeader>

              <StyledTabBody active={checkoutStep === CHECKOUT_STEP_PERSONAL}>
                {checkoutStep === CHECKOUT_STEP_PERSONAL && (
                  <FormCheckoutPersonal
                    values={personalDetails}
                    emitData={payload => {
                      handleOrderDetails('personalDetails', CHECKOUT_STEP_SHIPPING, payload);
                    }}
                  />
                )}
              </StyledTabBody>
            </StyledTab>

            <StyledTab>
              <StyledTabHeader>
                <h3>2. Shipping</h3>

                {shippingDetails.streetName && (
                  <StyledButtonEdit onClick={() => setCheckoutStep(CHECKOUT_STEP_SHIPPING)}>
                    Edit
                  </StyledButtonEdit>
                )}
              </StyledTabHeader>

              <StyledTabBody active={checkoutStep === CHECKOUT_STEP_SHIPPING}>
                {checkoutStep === CHECKOUT_STEP_SHIPPING && (
                  <FormCheckoutShipping
                    emitData={payload => {
                      handleOrderDetails('shippingDetails', CHECKOUT_STEP_FINAL, payload);
                    }}
                  />
                )}
              </StyledTabBody>
            </StyledTab>
          </StyledTabsWrapper>

          {checkoutStep === CHECKOUT_STEP_FINAL && (
            <StyledPlaceOrder>
              <Button action={handlePlaceOrder}>Place order</Button>
            </StyledPlaceOrder>
          )}
        </StyledMainContainer>

        <StyledSideBarWrapper>
          <StyledSideBar>
            <h2>Order summary</h2>
            <ProductsListMini products={productsInCart} cardLocked />
            <StyledTotalPrice>
              <div>Total price:</div>
              <div>{cartTotalPrice}€</div>
            </StyledTotalPrice>
          </StyledSideBar>
        </StyledSideBarWrapper>
      </StyledContainer>
      {orderId && <Redirect to={routes.orderPlaced} />}
    </StyledWrapper>
  );
};

CheckoutView.propTypes = {
  productsInCart: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  ).isRequired,
  cartTotalPrice: PropTypes.string,
  placeOrder: PropTypes.func.isRequired,
  fillOrderDetails: PropTypes.func.isRequired,
  setCheckoutStep: PropTypes.func.isRequired,
  generateNotification: PropTypes.func.isRequired,
  checkoutStep: PropTypes.string.isRequired,
  personalDetails: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  ).isRequired,
  shippingDetails: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  ).isRequired,
  orderId: PropTypes.number,
};

CheckoutView.defaultProps = {
  cartTotalPrice: '',
  orderId: null,
};

const mapStateToProps = state => {
  const { productsInCart, cartTotalPrice } = state.cart;
  const { checkoutStep } = state.appState;
  const { orderId, personalDetails, shippingDetails } = state.orderDetails;
  return {
    productsInCart,
    cartTotalPrice,
    checkoutStep,
    orderId,
    personalDetails,
    shippingDetails,
  };
};

const mapDispatchToProps = dispatch => ({
  placeOrder: payload => dispatch(placeOrder(payload)),
  fillOrderDetails: payload => dispatch(fillOrderDetails(payload)),
  setCheckoutStep: payload => dispatch(setCheckoutStep(payload)),
  generateNotification: payload => dispatch(generateNotification(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutView);
