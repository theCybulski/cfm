import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { manageCartQty } from 'store/actions';

import PriceHolder from 'components/atoms/PriceHolder/PriceHolder';
import Input from 'components/atoms/Input/Input';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import IconClose from 'assets/images/icon-close.svg';

const StyledProductWrapper = styled.div`
  position: relative;
  display: flex;

  &:before {
    content: '';
    position: absolute;
    top: 30px;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${({ theme }) => theme.color.greyLight};
    border-radius: 10px;
    z-index: -1;
    box-shadow: 0 20px 70px -10px rgba(0, 0, 0, 0);
    transition: box-shadow 0.3s ease-out;
  }

  @media (max-width: 768px) {
    &:before {
      top: 0;
    }
  }
`;

const StyledHeader = styled.header`
  padding: 50px 10px 10px 0;
  text-align: left;
  width: 100%;

  button {
    position: absolute;
    top: 0;
    right: 0;
  }

  ${({ locked }) =>
    locked &&
    css`
      padding: 20px 30px 0 0;
    `};

  @media (max-width: 768px) {
    padding: 15px 30px 15px 0;
  }
`;

const StyledProductThumb = styled.img`
  margin: 0 auto;
  height: 230px;
  max-height: 230px;

  @media (max-width: 768px) {
    height: 100px;
    max-height: 100px;
    padding: 15px 0;
  }
`;

const StyledLink = styled.div`
  a {
    display: inline-block;
  }
`;

const StyledProductName = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: 200;
  text-decoration: none;
  color: ${({ theme }) => theme.color.black};
  margin: 0 0 15px;

  ${({ locked }) =>
    locked &&
    css`
      font-size: ${({ theme }) => theme.fontSize.m};
    `};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.s};
    margin: 0 0 5px;
  }
`;

const StyledSku = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.color.grey};
`;

const StyledDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const CardProductMini = ({
  id,
  qty,
  productThumb,
  productName,
  price,
  sku,
  productsInCart,
  manageCartQty,
  locked,
}) => {
  const totalProductPrice = (parseFloat(price) * parseFloat(qty)).toFixed(2);

  const handleRemoveFromCart = () => {
    const newProducts = productsInCart.filter(product => product.id !== id);
    manageCartQty(newProducts);
  };

  const handleQtyChange = e => {
    if (e.target.value < 1) return;

    const newProducts = productsInCart.map(product => {
      if (product.id === id) {
        /* eslint-disable radix */
        product.qty = parseInt(e.target.value);
        /* eslint-enable */
      }
      return product;
    });

    manageCartQty(newProducts);
  };

  return (
    <StyledProductWrapper>
      <StyledLink>
        <NavLink to="/">
          <StyledProductThumb src={productThumb} alt={productName} />
        </NavLink>
      </StyledLink>
      <StyledHeader locked={locked}>
        {!locked && <ButtonIcon icon={IconClose} small action={handleRemoveFromCart} />}

        <StyledProductName locked={locked}>
          <NavLink to="/">{productName}</NavLink>
        </StyledProductName>
        <StyledSku>
          <b>SKU:</b> {sku}
        </StyledSku>
        <StyledDetailsWrapper>
          {locked ? (
            <span>{qty}kg</span>
          ) : (
            <Input
              type="number"
              name="quantity"
              elWidth="100px"
              value={qty}
              onChange={handleQtyChange}
              mini
            />
          )}
          <PriceHolder price={totalProductPrice} small noWeight locked={locked} />
        </StyledDetailsWrapper>
      </StyledHeader>
    </StyledProductWrapper>
  );
};

CardProductMini.propTypes = {
  id: PropTypes.number.isRequired,
  productThumb: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  qty: PropTypes.number,
  sku: PropTypes.string.isRequired,
  productsInCart: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  ),
  manageCartQty: PropTypes.func,
  locked: PropTypes.bool,
};

CardProductMini.defaultProps = {
  qty: '1',
  productsInCart: [],
  manageCartQty: () => {},
  locked: false,
};

const mapStateToProps = state => {
  const { productsInCart } = state.cart;
  return { productsInCart };
};

const mapDispatchToProps = dispatch => ({
  manageCartQty: prodId => dispatch(manageCartQty(prodId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardProductMini);
