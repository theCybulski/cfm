import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { routes } from 'routes';

import Container from 'components/atoms/Container/Container';
import Logo from 'components/atoms/Logo/Logo';
import UserNav from 'components/molecules/UserNav/UserNav';
import NotificationsLog from 'components/molecules/NotificationsLog/NotificationsLog';

const StyledHeader = styled.header`
  position: relative;
  padding: 40px 0;
  background: ${({ theme }) => theme.color.brownCreme}
    ${({ isScrolled }) =>
      isScrolled &&
      css`
        position: fixed;
        top: 0;
        width: 100%;
        padding: 10px 0;
        z-index: 9;
      `};
`;

const StyledDummy = styled.div`
  width: 100%;
  height: 134px;
  padding: 40px 0;
  display: block;
`;

const StyledContainer = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const PageHeader = ({ location }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleHeaderPosition = useCallback(() => {
    if (window.pageYOffset > 30) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, [setIsScrolled]);

  useEffect(() => {
    window.addEventListener('scroll', handleHeaderPosition);
  }, [handleHeaderPosition]);
  return (
    <>
      {location.pathname !== routes.orderPlaced && (
        <>
          <StyledHeader isScrolled={isScrolled}>
            <StyledContainer>
              <NavLink to="/">
                <Logo />
              </NavLink>
              {location.pathname !== routes.checkout && <UserNav />}
            </StyledContainer>
          </StyledHeader>
          {isScrolled && <StyledDummy />}
        </>
      )}
      <NotificationsLog />
    </>
  );
};

PageHeader.propTypes = {
  location: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]).isRequired,
};

export default withRouter(PageHeader);
