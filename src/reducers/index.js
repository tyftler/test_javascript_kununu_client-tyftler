import { combineReducers } from 'redux';

import citiesReducer from './cities';

export default combineReducers({
  cities: citiesReducer
  // other reducers...
});
