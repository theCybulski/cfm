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

const FormCheckoutShipping = ({ emitData }) => {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(data => emitData(data))}>
      <StyledWrapper inputStyle="short">
        <Input
          name="streetName"
          ref={register({ required: true })}
          placeholder="Street name"
          type="text"
        />
        <br />
        {errors.streetName && <StyledError>This field is required</StyledError>}
        <br />
      </StyledWrapper>

      <StyledWrapper inputStyle="short">
        <Input
          name="houseNo"
          ref={register({ required: true })}
          placeholder="House/Apartment number"
          type="text"
        />
        <br />
        {errors.houseNo && <StyledError>This field is required</StyledError>}
        <br />
      </StyledWrapper>

      <StyledWrapper inputStyle="short">
        <Input name="city" ref={register({ required: true })} placeholder="City" type="text" />
        <br />
        {errors.city && <StyledError>This field is required</StyledError>}
        <br />
      </StyledWrapper>

      <StyledWrapper inputStyle="short">
        <Input name="zip" ref={register({ required: true })} placeholder="Zip code" type="text" />
        <br />
        {errors.zip && <StyledError>This field is required</StyledError>}
        <br />
      </StyledWrapper>

      <StyledWrapper inputStyle="short">
        <Input
          name="phone"
          ref={register({ required: true })}
          placeholder="Phone number"
          type="text"
        />
        <br />
        {errors.phone && <StyledError>This field is required</StyledError>}
        <br />
      </StyledWrapper>

      <StyledWrapper>
        <Button type="submit">Confirm</Button>
      </StyledWrapper>
    </form>
  );
};

FormCheckoutShipping.propTypes = {
  emitData: PropTypes.func,
};

FormCheckoutShipping.defaultProps = {
  emitData: () => {},
};

export default FormCheckoutShipping;
