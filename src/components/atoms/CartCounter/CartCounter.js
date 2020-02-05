import styled, { css } from 'styled-components';

const CartCounter = styled.div`
  font-family: 'Gotham', sans-serif;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.black};
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(1);

  @keyframes bounce {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.3);
      background: ${({ theme }) => theme.color.green};
    }
  }

  ${({ bounce }) =>
    bounce &&
    css`
      animation: bounce 0.2s alternate infinite;
    `}
`;

export default CartCounter;
