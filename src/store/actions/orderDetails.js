import axios from 'axios';
import { BASE_URL } from 'store/constants';

export const SET_ORDER_ID = 'SET_ORDER_ID';
export const FILL_ORDER_DETAILS = 'FILL_ORDER_DETAILS';
export const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS';

export const setOrderId = payload => {
  return { type: SET_ORDER_ID, payload };
};

export const placeOrder = payload => {
  return dispatch => {
    const order = {
      Total_order_price: payload.cartTotalPrice,
      Product: [
        ...payload.products.map(({ name, sku, price, qty }) => ({
          Name: name,
          SKU: sku,
          Price: price,
          Quantity: qty,
        })),
      ],
      Contact_info: {
        First_name: payload.personalDetails.firstName,
        Last_name: payload.personalDetails.lastName,
        Email: payload.personalDetails.email,
        Street_name: payload.shippingDetails.streetName,
        House_apartment_no: payload.shippingDetails.houseNo,
        City: payload.shippingDetails.city,
        Zip_code: payload.shippingDetails.zip,
        Phone_number: payload.shippingDetails.phone,
      },
    };

    const request = axios({
      method: 'POST',
      url: `${BASE_URL}/orders`,
      data: order,
    });

    request
      .then(response => {
        console.log(response);
        dispatch({
          type: SET_ORDER_ID,
          payload: response.data.id,
        });
      })
      .catch(err => console.log(err));
  };
};

export const fillOrderDetails = payload => {
  return { type: FILL_ORDER_DETAILS, payload };
};

export const clearOrderDetails = payload => {
  return { type: CLEAR_ORDER_DETAILS, payload };
};
