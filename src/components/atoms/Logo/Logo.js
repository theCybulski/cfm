import styled from 'styled-components';
import LogoSvg from 'assets/images/logo.svg';

const Logo = styled.div`
  content: '';
  width: 67px;
  height: 22px;
  mask: url(${LogoSvg}) no-repeat;
  mask-size: contain;
  background: ${({ theme }) => theme.color.brown};
  transition: background 0.2s ease-out;

  &:hover {
    background: ${({ theme }) => theme.color.green};
  }
`;

export default Logo;
