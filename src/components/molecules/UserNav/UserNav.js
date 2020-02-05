import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

import { toggleCart, searchCatalog } from 'store/actions';

import CartWidget from 'components/organisms/CartWidget/CartWidget';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import CartCounter from 'components/atoms/CartCounter/CartCounter';
import Input from 'components/atoms/Input/Input';
import CartIcon from 'assets/images/icon-cart.svg';
import MagnifierIcon from 'assets/images/icon-magnifier.svg';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 768px) {
    position: relative;
  }
`;

const StyledCounter = styled(CartCounter)`
  position: absolute;
  bottom: 3px;
  right: 6px;
`;

const StyledSearch = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: right;

  button {
    z-index: 2;
  }

  @media (max-width: 768px) {
    position: static;
  }
`;

const StyledInput = styled(Input)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 15px 50px 15px 25px;
  visibility: hidden;
  transform-origin: right center;
  opacity: 0;
  transform: scaleX(0);
  transition: transform 0.3s ease-out, opacity 0.2s ease-out, visibility 0.3s ease-out;

  ${({ opened }) =>
    opened &&
    css`
      opacity: 1;
      visibility: visible;
      transform: scaleX(1);
    `};

  @media (max-width: 768px) {
    right: 30px;
    width: calc(100vw - 70px);
  }
`;

const UserNav = ({ isCartOpened, toggleCart, productsInCart, searchValue, searchCatalog }) => {
  const [isSearchOpened, setIsSearchOpened] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const counter = productsInCart.length ? productsInCart.reduce((sum, x) => sum + x.qty, 0) : 0;

  // bounce counter
  useEffect(() => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 300);
  }, [counter]);

  const handleToggleSearch = () => {
    searchCatalog('');
    setIsSearchOpened(!isSearchOpened);
  };

  const handleSearch = e => searchCatalog(e.target.value);

  return (
    <StyledWrapper>
      <CartWidget toggleCart={() => toggleCart(!isCartOpened)} />

      <StyledSearch>
        <ButtonIcon icon={MagnifierIcon} action={handleToggleSearch} />
        <StyledInput
          elWidth="100%"
          opened={isSearchOpened}
          value={searchValue}
          onChange={handleSearch}
          placeholder="Search..."
        />
      </StyledSearch>
      <ButtonIcon icon={CartIcon} action={() => toggleCart(!isCartOpened)}>
        <StyledCounter bounce={isBouncing}>{counter}</StyledCounter>
      </ButtonIcon>
    </StyledWrapper>
  );
};

UserNav.propTypes = {
  isCartOpened: PropTypes.bool,
  toggleCart: PropTypes.func,
  productsInCart: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  ),
  searchValue: PropTypes.string,
  searchCatalog: PropTypes.func,
};

UserNav.defaultProps = {
  isCartOpened: false,
  toggleCart: () => {},
  productsInCart: [],
  searchValue: '',
  searchCatalog: () => {},
};

const mapStateToProps = state => {
  const { isCartOpened, productsInCart } = state.cart;
  const { searchValue } = state.appState;
  return { isCartOpened, productsInCart, searchValue };
};

const mapDispatchToProps = dispatch => ({
  toggleCart: payload => dispatch(toggleCart(payload)),
  searchCatalog: payload => dispatch(searchCatalog(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserNav);
