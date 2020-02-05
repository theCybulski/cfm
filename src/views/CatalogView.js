import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { fetchProducts } from 'store/actions';

import Container from 'components/atoms/Container/Container';
import CardProduct from 'components/molecules/CardProduct/CardProduct';

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 50px 30px;
  padding-bottom: 200px;

  @media (max-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 50px 15px;
  }
`;

const CatalogView = ({ fetchProducts, searchValue, products }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  const filterProducts = useCallback(() => {
    if (searchValue) {
      const filteredProducts = products.filter(product => {
        const lcProductName = product?.name?.toLowerCase();
        const lcSearchValue = searchValue?.toLowerCase();
        const doesProductIncludeSearchValue = lcProductName?.includes(lcSearchValue);
        return doesProductIncludeSearchValue;
      });
      setFilteredProducts(filteredProducts);
    } else {
      setFilteredProducts(products);
    }
  }, [searchValue, products]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    filterProducts();
  }, [products, filterProducts]);

  return (
    <Container>
      {filteredProducts?.length > 0 ? (
        <StyledProductsGrid>
          {filteredProducts?.map(({ id, thumb, name, price }) => (
            <CardProduct key={id} id={id} productThumb={thumb} productName={name} price={price} />
          ))}
        </StyledProductsGrid>
      ) : (
        <h2>Sorry, we could not find any matching products</h2>
      )}
    </Container>
  );
};

CatalogView.propTypes = {
  searchValue: PropTypes.string,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      thumb: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    }),
  ),
  fetchProducts: PropTypes.func.isRequired,
};

CatalogView.defaultProps = {
  searchValue: '',
  products: [],
};

const mapStateToProps = state => {
  const { products, searchValue } = state.appState;
  return { products, searchValue };
};

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogView);
