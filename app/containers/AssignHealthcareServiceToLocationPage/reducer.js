/*
 *
 * AssignHealthCareServiceToLocationPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR,
  GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_SUCCESS,
  INITIALIZE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  UNASSIGN_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  UNASSIGN_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR,
  UPDATE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  UPDATE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  data: [],
  organization: null,
  location: null,
  currentPage: 0,
  totalNumberOfPages: 0,
  includeInactive: false,
});

function assignHealthCareServiceToLocationPageReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT:
      return initialState;
    case GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT: {
      const organization = { id: action.organizationId, name: action.organizationName };
      const location = { id: action.locationId };
      return state
        .set('currentPage', action.currentPage)
        .set('includeInactive', action.includeInactive)
        .set('organization', organization)
        .set('location', location)
        .set('loading', true)
        .set('error', false);
    }
    case GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_SUCCESS:
      return state.set('data', fromJS((action.healthcareServices && action.healthcareServices.elements) || []))
        .set('loading', false)
        .set('totalNumberOfPages', action.healthcareServices.totalNumberOfPages)
        .set('currentPage', action.healthcareServices.currentPage);
    case GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case UPDATE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT:
      return state.set('healthcareServiceId', action.healthcareServiceId);
    case UNASSIGN_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT:
      return state.set('healthcareServiceId', action.healthcareServiceId);
    case UPDATE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case UNASSIGN_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default assignHealthCareServiceToLocationPageReducer;
