export const TOGGLE_CART = 'TOGGLE_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const MANAGE_CART_QTY = 'MANAGE_CART_QTY';
export const CHANGE_TOTAL_PRICE = 'CHANGE_TOTAL_PRICE';
export const CLEAR_CART_STATE = 'CLEAR_CART_STATE';

export const addToCart = payload => {
  return { type: ADD_TO_CART, payload };
};

export const manageCartQty = payload => {
  return { type: MANAGE_CART_QTY, payload };
};

export const changeTotalPrice = payload => {
  return { type: CHANGE_TOTAL_PRICE, payload };
};

export const toggleCart = payload => {
  return { type: TOGGLE_CART, payload };
};

export const clearCartState = payload => {
  return { type: CLEAR_CART_STATE, payload };
};
