/*
 *
 * AssignLocationToPractitionerPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INITIALIZE_ASSIGN_LOCATION_TO_PRACTITIONER,
  GET_PRACTIONER_LOCATION_ASSIGNMENT,
  GET_PRACTIONER_LOCATION_ASSIGNMENT_SUCCESS,
  GET_PRACTIONER_LOCATION_ASSIGNMENT_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  data: [],
  currentPage: 0,
  totalNumberOfPages: 0,
  includeInactive: false,
});

function assignLocationToPractitionerPageReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_ASSIGN_LOCATION_TO_PRACTITIONER:
      return initialState;
    case GET_PRACTIONER_LOCATION_ASSIGNMENT: {
      return state
        .set('currentPage', action.currentPage)
        // .set('includeInactive', action.includeInactive)
        .set('loading', true)
        .set('error', false);
    }
    case GET_PRACTIONER_LOCATION_ASSIGNMENT_SUCCESS:
      return state.set('data', fromJS((action.practitionerLocations && action.practitionerLocations.elements) || []))
        .set('loading', false)
        .set('totalNumberOfPages', action.practitionerLocations.totalNumberOfPages)
        .set('currentPage', action.practitionerLocations.currentPage);
    case GET_PRACTIONER_LOCATION_ASSIGNMENT_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default assignLocationToPractitionerPageReducer;
