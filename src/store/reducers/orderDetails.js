import { SET_ORDER_ID, FILL_ORDER_DETAILS, CLEAR_ORDER_DETAILS } from 'store/actions';

const initialState = {
  orderId: null,
  personalDetails: {
    firstName: '',
    lastName: '',
    email: '',
  },
  shippingDetails: {
    streetName: '',
    houseNo: '',
    city: '',
    zip: '',
    phone: '',
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ORDER_ID:
      return {
        ...state,
        orderId: payload,
      };
    case FILL_ORDER_DETAILS:
      return {
        ...state,
        [payload.type]: payload.payload,
      };
    case CLEAR_ORDER_DETAILS:
      return {
        orderId: initialState.orderId,
        personalDetails: initialState.personalDetails,
        shippingDetails: initialState.shippingDetails,
      };
    default:
      return state;
  }
};
