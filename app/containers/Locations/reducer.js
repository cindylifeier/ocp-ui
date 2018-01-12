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
  locations: {},
  organization: {},
});

function locationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATIONS_SUCCESS:
      return state.setIn(['locations'], action.locations);
    case GET_ACTIVE_LOCATIONS: {
      const organization = { id: action.organizationId, name: action.organizationName };
      return state.setIn(['organization'], organization);
    }
    default:
      return state;
  }
}

export default locationsReducer;
