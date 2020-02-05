import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { addToCart, manageCartQty, generateNotification } from 'store/actions';
import Button from 'components/atoms/Button/Button';
import PriceHolder from 'components/atoms/PriceHolder/PriceHolder';

const StyledActionWrapper = styled.div`
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translate(-50%, -30px);
  opacity: 0;
  visibility: hidden;
  width: 100%;
  text-align: center;
  transition: opacity 0.2s ease-out, visibility 0.2s ease-out, transform 0.3s ease-out;

  @media (max-width: 768px) {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, 0);
    bottom: -17px;
  }
`;

const StyledProductWrapper = styled.div`
  position: relative;
  min-height: 0;
  min-width: 0;

  &:before {
    content: '';
    position: absolute;
    top: 30px;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${({ theme }) => theme.color.white};
    border-radius: 10px;
    z-index: -1;
    box-shadow: 0 20px 70px -10px rgba(0, 0, 0, 0);
    transition: box-shadow 0.3s ease-out;
  }

  &:hover {
    &::before {
      box-shadow: 0 20px 70px -10px rgba(0, 0, 0, 0.1);
    }

    ${StyledActionWrapper} {
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
    }
  }
`;

const StyledHeader = styled.header`
  padding: 0 30px 50px;

  @media (max-width: 768px) {
    padding: 0 15px 25px;
  }
`;

const StyledProductThumb = styled.img`
  margin: 0 auto;
  width: 100%;
  max-height: 375px;
`;

const StyledProductName = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: 200;
  text-decoration: none;
  color: ${({ theme }) => theme.color.black};
  margin: 0 0 30px;
  min-height: 2.5em;

  @media (max-width: 768px) {
    margin: 0 0 5px;
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const CardProduct = ({
  id,
  productThumb,
  productName,
  price,
  addToCart,
  manageCartQty,
  productsInCart,
  generateNotification,
  products,
}) => {
  const handleAddToCart = prodId => {
    const productInCart = [...productsInCart].find(product => product.id === prodId);

    if (productInCart) {
      const incrementedProducts = productsInCart.map(product => {
        if (product.id === prodId) {
          product.qty++;
        }
        return product;
      });

      generateNotification({
        type: 'info',
        message: "Product's already in cart. Added another kilogram.",
      });
      manageCartQty(incrementedProducts);
    } else {
      const productToAdd = {
        ...products.find(product => product.id === prodId),
        qty: 1,
      };

      generateNotification({
        type: 'success',
        message: 'Product has been added to your cart.',
      });
      addToCart(productToAdd);
    }
  };

  return (
    <StyledProductWrapper>
      <a href="/">
        <StyledProductThumb src={productThumb} alt={productName} />
      </a>
      <StyledHeader>
        <StyledProductName>
          <a href="/">{productName}</a>
        </StyledProductName>
        <PriceHolder price={price} />
        <StyledActionWrapper>
          <Button action={() => handleAddToCart(id)}>Add to cart</Button>
        </StyledActionWrapper>
      </StyledHeader>
    </StyledProductWrapper>
  );
};

CardProduct.propTypes = {
  id: PropTypes.number.isRequired,
  productThumb: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  addToCart: PropTypes.func,
  manageCartQty: PropTypes.func,
  generateNotification: PropTypes.func,
  productsInCart: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  ),
  products: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  ),
};

CardProduct.defaultProps = {
  addToCart: () => {},
  manageCartQty: () => {},
  generateNotification: () => {},
  productsInCart: [],
  products: [],
};

const mapStateToProps = state => {
  const { productsInCart } = state.cart;
  const { products } = state.appState;
  return { productsInCart, products };
};

const mapDispatchToProps = dispatch => ({
  addToCart: prodId => dispatch(addToCart(prodId)),
  manageCartQty: prodId => dispatch(manageCartQty(prodId)),
  generateNotification: payload => dispatch(generateNotification(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardProduct);
