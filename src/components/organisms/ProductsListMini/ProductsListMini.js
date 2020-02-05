import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import CardProductMini from 'components/molecules/CardProductMini/CardProductMini';

const StyledWrapper = styled.ul`
  margin: 0;
  padding: 0 50px;
  list-style: none;
  flex: 100;

  li {
    margin-bottom: 30px;
  }

  ${({ cardLocked }) =>
    cardLocked &&
    css`
      padding: 0;
    `};

  @media (max-width: 768px) {
    padding: 0 20px;

    li {
      margin-bottom: 15px;
    }
  }
`;

const ProductsListMini = ({ products, cardLocked }) => (
  <StyledWrapper cardLocked={cardLocked}>
    {products.map(({ id, thumb, name, price, qty, sku }) => (
      <li key={id}>
        <CardProductMini
          id={id}
          productThumb={thumb}
          productName={name}
          price={price}
          qty={qty}
          sku={sku}
          locked={cardLocked}
        />
      </li>
    ))}
  </StyledWrapper>
);

ProductsListMini.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  ).isRequired,
  cardLocked: PropTypes.bool,
};

ProductsListMini.defaultProps = {
  cardLocked: false,
};

export default ProductsListMini;
