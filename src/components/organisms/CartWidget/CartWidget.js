import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import Button from 'components/atoms/Button/Button';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import ProductsListMini from 'components/organisms/ProductsListMini/ProductsListMini';
import { changeTotalPrice } from 'store/actions';
import { routes } from 'routes';

import IconClose from 'assets/images/icon-close.svg';

const StyledWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 0;
  right: 0;
  height: 100%;
  width: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${({ theme }) => theme.color.white};
  z-index: 10;
  transform: translateX(100%);
  opacity: 0;
  transition: transform 0.2s ease-out, opacity 0.3s ease-out;
  border-left: 1px solid ${({ theme }) => theme.color.brownLight};

  ${({ opened }) =>
    opened &&
    css`
      opacity: 1;
      transform: translateX(0);
    `};

  @media (max-width: 768px) {
    width: 100%;
    border-left: none;
  }
`;

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 50px;
  flex: 1;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const StyledHeading = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.l};
  }
`;

const StyledSummaryWrapper = styled.div`
  padding: 40px 50px 40px;
  flex: 1;
  background: ${({ theme }) => theme.color.greyLight};

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const StyledTotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.xl};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.l};
  }
`;

const CartWidget = ({
  productsInCart,
  changeTotalPrice,
  isCartOpened,
  cartTotalPrice,
  toggleCart,
}) => {
  const manageTotalPrice = useCallback(() => {
    const totalPrice = productsInCart.length
      ? productsInCart.reduce((sum, x) => sum + x.qty * x.price, 0)
      : '00.00';
    changeTotalPrice(parseFloat(totalPrice).toFixed(2));
  }, [productsInCart, changeTotalPrice]);

  useEffect(() => {
    manageTotalPrice();
  }, [productsInCart, manageTotalPrice]);

  return (
    <StyledWrapper opened={isCartOpened}>
      <StyledHeader>
        <StyledHeading>Cart</StyledHeading>
        <ButtonIcon icon={IconClose} action={toggleCart} />
      </StyledHeader>
      <ProductsListMini products={productsInCart} />
      <StyledSummaryWrapper>
        <StyledTotalPrice>
          <div>Total price:</div>
          <div>{cartTotalPrice}€</div>
        </StyledTotalPrice>
        <NavLink to={routes.checkout}>
          <Button elWidth="100%" action={toggleCart}>
            Go to checkout
          </Button>
        </NavLink>
      </StyledSummaryWrapper>
    </StyledWrapper>
  );
};

CartWidget.propTypes = {
  isCartOpened: PropTypes.bool,
  toggleCart: PropTypes.func,
  productsInCart: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  ),
  changeTotalPrice: PropTypes.func.isRequired,
  cartTotalPrice: PropTypes.string,
};

CartWidget.defaultProps = {
  isCartOpened: false,
  toggleCart: () => {},
  productsInCart: [],
  cartTotalPrice: '00.00',
};

const mapStateToProps = state => {
  const { productsInCart, isCartOpened, cartTotalPrice } = state.cart;
  return { productsInCart, isCartOpened, cartTotalPrice };
};

const mapDispatchToProps = dispatch => ({
  changeTotalPrice: price => dispatch(changeTotalPrice(price)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartWidget);
