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
  data: [],
  organization: {},
});

function locationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATIONS_SUCCESS:
      return state.set('data', action.locations);
    case GET_ACTIVE_LOCATIONS: {
      const organization = { id: action.organizationId, name: action.organizationName };
      return state.setIn(['organization'], organization);
    }
    default:
      return state;
  }
}

export default locationsReducer;
