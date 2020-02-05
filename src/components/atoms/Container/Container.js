import styled from 'styled-components';

const Container = styled.div`
  margin: 0 150px;

  @media (max-width: 1024px) {
    margin: 0 75px;
  }

  @media (max-width: 768px) {
    margin: 0 20px;
  }
`;

export default Container;
