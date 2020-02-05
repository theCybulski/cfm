import styled, { css } from 'styled-components';

const Input = styled.input`
  font-family: 'Gotham', sans-serif;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.book};
  padding: 15px 25px;
  border-radius: 60px;
  border: 1px solid ${({ theme }) => theme.color.brownLight};
  background: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.black};
  width: ${({ elWidth }) => elWidth || '100%'};

  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.color.brown};
  }

  ${({ mini }) =>
    mini &&
    css`
      background: transparent;
      border: none;
      border-bottom: 1px solid ${({ theme }) => theme.color.brownLight};
      border-radius: 0;
      padding: 10px 0 10px 10px;
      width: 50px;

      &:focus {
        border: none;
        border-bottom: 1px solid ${({ theme }) => theme.color.brownLight};
      }
    `};
`;

export default Input;
