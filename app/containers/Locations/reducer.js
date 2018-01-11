/*
 *
 * Locations reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_LOCATIONS_SUCCESS,
  GET_ACTIVE_LOCATIONS,
} from './constants';

const initialState = fromJS({
  locations: [],
  organizationId: '',
});

function locationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATIONS_SUCCESS:
      return state.set('locations', action.locations);
    case GET_ACTIVE_LOCATIONS:
      return state.setIn(['organizationId'], action.organizationId);
    default:
      return state;
  }
}

export default locationsReducer;
