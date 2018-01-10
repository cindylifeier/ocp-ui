/*
 *
 * Locations reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_LOCATIONS_SUCCESS,
} from './constants';

const initialState = fromJS({
  locations: [],
});

function locationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATIONS_SUCCESS:
      return state.set('locations', action.locations);
    default:
      return state;
  }
}

export default locationsReducer;
