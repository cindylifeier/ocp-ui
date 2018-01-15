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
  currentPage: 0,
  totalNumberOfPages: 0,
});

function locationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATIONS_SUCCESS:
      return state.set('data', fromJS((action.locations && action.locations.elements) || []))
        .setIn(['totalNumberOfPages'], action.locations.totalNumberOfPages)
        .setIn(['currentPage'], action.locations.currentPage);
    case GET_ACTIVE_LOCATIONS: {
      const organization = { id: action.organizationId, name: action.organizationName };
      return state.setIn(['organization'], organization);
    }
    default:
      return state;
  }
}

export default locationsReducer;
