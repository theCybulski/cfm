import { combineReducers } from 'redux';

import appState from './appState';
import cart from './cart';
import orderDetails from './orderDetails';

const rootReducer = combineReducers({
  appState,
  cart,
  orderDetails,
});

export default rootReducer;
