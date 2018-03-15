/*
 *
 * HealthcareServices reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_HEALTHCARE_SERVICES_BY_LOCATION,
  GET_HEALTHCARE_SERVICES_BY_ORGANIZATION,
  GET_HEALTHCARE_SERVICES_ERROR,
  GET_HEALTHCARE_SERVICES_SUCCESS,
  INITIALIZE_HEALTHCARE_SERVICES,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  data: [],
  location: null,
  currentPage: 0,
  totalNumberOfPages: 0,
  includeInactive: false,
});

function healthcareServicesReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_HEALTHCARE_SERVICES:
      return initialState;
    case GET_HEALTHCARE_SERVICES_BY_ORGANIZATION: {
      return state
        .set('data', fromJS([]))
        .set('currentPage', action.currentPage)
        .set('includeInactive', action.includeInactive)
        .set('location', null)
        .set('loading', true)
        .set('error', false);
    }
    case GET_HEALTHCARE_SERVICES_BY_LOCATION: {
      const location = { id: action.locationId, name: action.locationName };
      return state
        .set('data', fromJS([]))
        .set('currentPage', action.currentPage)
        .set('includeInactive', action.includeInactive)
        .set('location', location)
        .set('loading', true)
        .set('error', false);
    }
    case GET_HEALTHCARE_SERVICES_SUCCESS:
      return state
        .set('data', fromJS((action.healthcareServices && action.healthcareServices.elements) || []))
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
