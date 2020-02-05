import { CHECKOUT_STEP_PERSONAL } from 'store/constants';
import {
  SEARCH,
  FETCH_PRODUCTS,
  PUSH_NOTIFICATION,
  REMOVE_NOTIFICATION,
  SET_CHECKOUT_STEP,
  CLEAR_APP_STATE,
} from 'store/actions';

const initialState = {
  searchValue: '',
  products: [],
  notifications: [],
  checkoutStep: CHECKOUT_STEP_PERSONAL,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: [...payload],
      };
    case SEARCH:
      return {
        ...state,
        searchValue: payload,
      };
    case PUSH_NOTIFICATION:
      return {
        ...state,
        notifications: [payload, ...state.notifications],
      };
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications].filter(item => item.id !== payload),
      };
    case SET_CHECKOUT_STEP:
      return {
        ...state,
        checkoutStep: payload,
      };
    case CLEAR_APP_STATE:
      return {
        ...state,
        searchValue: initialState.searchValue,
        notifications: initialState.notifications,
        checkoutStep: initialState.checkoutStep,
      };
    default:
      return state;
  }
};
