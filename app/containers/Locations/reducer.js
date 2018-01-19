/*
 *
 * Locations reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_LOCATIONS_SUCCESS,
  GET_ACTIVE_LOCATIONS, GET_FILTERED_LOCATIONS,
} from './constants';

const initialState = fromJS({
  data: [],
  organization: {},
  currentPage: 0,
  totalNumberOfPages: 0,
  includeInactive: false,
  includeSuspended: false,
});

function locationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FILTERED_LOCATIONS:
      return state
        .setIn(['currentPage'], action.currentPage)
        .setIn(['includeInactive'], action.includeInactive)
        .setIn(['includeSuspended'], action.includeSuspended);
    case GET_LOCATIONS_SUCCESS:
      return state.set('data', fromJS((action.locations && action.locations.elements) || []))
        .setIn(['totalNumberOfPages'], action.locations.totalNumberOfPages)
        .setIn(['currentPage'], action.locations.currentPage);
    case GET_ACTIVE_LOCATIONS: {
      const organization = { id: action.organizationId, name: action.organizationName };
      return state.setIn(['organization'], organization)
        .setIn(['includeInactive'], false)
        .setIn(['includeSuspended'], false);
    }
    default:
      return state;
  }
}

export default locationsReducer;
