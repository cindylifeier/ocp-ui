/*
 *
 * HealthcareServices reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_ACTIVE_HEALTHCARE_SERVICES,
  GET_FILTERED_HEALTHCARE_SERVICES, GET_HEALTHCARE_SERVICES_ERROR,
  GET_HEALTHCARE_SERVICES_SUCCESS,
  INITIALIZE_HEALTHCARE_SERVICES,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  data: [],
  organization: null,
  currentPage: 0,
  totalNumberOfPages: 0,
  includeInactive: false,
});

function healthcareServicesReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_HEALTHCARE_SERVICES:
      return initialState;
    case GET_FILTERED_HEALTHCARE_SERVICES:
      return state
        .set('currentPage', action.currentPage)
        .set('includeInactive', action.includeInactive);
    case GET_ACTIVE_HEALTHCARE_SERVICES: {
      const organization = { id: action.organizationId, name: action.organizationName };
      return state.setIn(['organization'], organization)
        .set('loading', true)
        .set('error', false)
        .set('includeInactive', false);
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

export default healthcareServicesReducer;
