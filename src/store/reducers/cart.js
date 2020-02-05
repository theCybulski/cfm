import {
  ADD_TO_CART,
  MANAGE_CART_QTY,
  TOGGLE_CART,
  CHANGE_TOTAL_PRICE,
  CLEAR_CART_STATE,
} from 'store/actions';

const initialState = {
  isCartOpened: false,
  cartTotalPrice: '00.00',
  productsInCart: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        productsInCart: [payload, ...state.productsInCart],
      };
    case MANAGE_CART_QTY:
      return {
        ...state,
        productsInCart: [...payload],
      };
    case TOGGLE_CART:
      return {
        ...state,
        isCartOpened: payload,
      };
    case CHANGE_TOTAL_PRICE:
      return {
        ...state,
        cartTotalPrice: payload,
      };
    case CLEAR_CART_STATE:
      return {
        isCartOpened: initialState.isCartOpened,
        cartTotalPrice: initialState.cartTotalPrice,
        productsInCart: initialState.productsInCart,
      };
    default:
      return state;
  }
};
