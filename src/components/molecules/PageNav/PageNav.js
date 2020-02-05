import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledNavItem = styled.li`
  display: inline-block;
  margin-left: 40px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  &:first-child {
    margin-left: 0;
  }
`;

const StyledLink = styled(NavLink)`
  &.active {
    text-decoration: underline;
  }
`;

const PageNav = () => (
  <nav>
    <StyledNav>
      <StyledNavItem>
        <StyledLink to="/">Homepage</StyledLink>
      </StyledNavItem>
      <StyledNavItem>
        <StyledLink to="/about-us">Products</StyledLink>
      </StyledNavItem>
      <StyledNavItem>
        <StyledLink to="/contact">Contact</StyledLink>
      </StyledNavItem>
    </StyledNav>
  </nav>
);

export default PageNav;
