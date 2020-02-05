import axios from 'axios';
import { BASE_URL } from 'store/constants';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const SEARCH = 'SEARCH';
export const SET_CHECKOUT_STEP = 'SET_CHECKOUT_STEP';

export const CLEAR_APP_STATE = 'CLEAR_APP_STATE';
export const PUSH_NOTIFICATION = 'PUSH_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const fetchProductsSuccess = payload => {
  return { type: FETCH_PRODUCTS, payload };
};

export const fetchProducts = () => {
  return dispatch => {
    return axios
      .get(`${BASE_URL}/products`)
      .then(({ data }) => {
        const products = data.map(({ id, Thumb, Name, Price, SKU }) => ({
          id,
          thumb: BASE_URL + Thumb.url,
          name: Name,
          price: Price.toFixed(2),
          sku: SKU,
        }));

        dispatch(fetchProductsSuccess(products));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const searchCatalog = payload => {
  return { type: SEARCH, payload };
};

export const pushNotification = payload => {
  return { type: PUSH_NOTIFICATION, payload };
};

export const generateNotification = payload => {
  return dispatch => {
    const notification = {
      id: Math.random()
        .toString(36)
        .substr(2, 9),
      type: payload.type,
      message: payload.message,
    };

    dispatch(pushNotification(notification));
  };
};

export const removeNotification = payload => {
  return { type: REMOVE_NOTIFICATION, payload };
};

export const setCheckoutStep = payload => {
  return { type: SET_CHECKOUT_STEP, payload };
};

export const clearAppState = payload => {
  return { type: CLEAR_APP_STATE, payload };
};
