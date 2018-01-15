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
  totalElements: 0,
  currentPageSize: 0,
  currentPage: 0,
});

function locationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATIONS_SUCCESS:
      return state.set('data', fromJS((action.locations && action.locations.elements) || []))
        .setIn(['totalElements'], action.locations.totalElements)
        .setIn(['currentPageSize'], action.locations.currentPageSize)
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
