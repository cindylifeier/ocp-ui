/*
 *
 * AssignHealthCareServiceToLocationPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_HEALTHCARE_SERVICES_BY_ORGANIZATION,
  GET_HEALTHCARE_SERVICES_ERROR,
  GET_HEALTHCARE_SERVICES_SUCCESS,
  INITIALIZE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
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
    case GET_HEALTHCARE_SERVICES_BY_ORGANIZATION: {
      const organization = { id: action.organizationId, name: action.organizationName };
      return state
        .set('currentPage', action.currentPage)
        .set('includeInactive', action.includeInactive)
        .set('organization', organization)
        .set('loading', true)
        .set('error', false);
    }
    case GET_HEALTHCARE_SERVICES_SUCCESS:
      return state.set('data', fromJS((action.healthcareServices && action.healthcareServices.elements) || []))
        .set('loading', false)
        .set('totalNumberOfPages', action.healthcareServices.totalNumberOfPages)
        .set('currentPage', action.healthcareServices.currentPage);
    case GET_HEALTHCARE_SERVICES_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default assignHealthCareServiceToLocationPageReducer;
