import React from 'react';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';

const StyledWrapper = styled.div`
  padding: 0 15px;
  ${({ inputStyle }) =>
    inputStyle === 'short' &&
    css`
      width: 50%;
      display: inline-block;
    `};

  @media (max-width: 768px) {
    padding: 0;

    ${({ inputStyle }) =>
      inputStyle === 'short' &&
      css`
        width: 100%;
        display: inline-block;
      `};
  }
`;

const StyledError = styled.span`
  padding: 2px 10px;
  color: ${({ theme }) => theme.color.red};
  margin: 5px;
  display: inline-block;
`;

const FormCheckoutPersonal = ({ emitData }) => {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(data => emitData(data))}>
      <StyledWrapper inputStyle="short">
        <Input
          name="firstName"
          ref={register({ required: true })}
          placeholder="First name"
          type="text"
        />
        <br />
        {errors.firstName && <StyledError>This field is required</StyledError>}
        <br />
      </StyledWrapper>

      <StyledWrapper inputStyle="short">
        <Input
          name="lastName"
          ref={register({ required: true })}
          placeholder="Last name"
          type="text"
        />
        <br />
        {errors.lastName && <StyledError>This field is required</StyledError>}
        <br />
      </StyledWrapper>

      <StyledWrapper inputStyle="long">
        <Input name="email" ref={register({ required: true })} placeholder="Email" type="email" />
        <br />
        {errors.email && <StyledError>This field is required</StyledError>}
        <br />
      </StyledWrapper>

      <StyledWrapper>
        <Button type="submit">Continue to shipping</Button>
      </StyledWrapper>
    </form>
  );
};

FormCheckoutPersonal.propTypes = {
  emitData: PropTypes.func,
};

FormCheckoutPersonal.defaultProps = {
  emitData: () => {},
};

export default FormCheckoutPersonal;
