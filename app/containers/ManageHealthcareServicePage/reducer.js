/*
 *
 * ManageHealthcareServicePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CREATE_HEALTHCARE_SERVICE_SUCCESS, CREATE_HEALTHCARE_SERVICE_ERROR,
  GET_HEALTHCARE_SERVICE_SUCCESS, UPDATE_HEALTHCARE_SERVICE_SUCCESS, UPDATE_HEALTHCARE_SERVICE_ERROR,
} from './constants';

const initialState = fromJS({
  error: false,
  healthcareService: null,
});

function manageHealthcareServicePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HEALTHCARE_SERVICE_SUCCESS:
      return state
        .set('healthcareService', action.healthcareService);
    case CREATE_HEALTHCARE_SERVICE_SUCCESS:
      return state.set('error', false);
    case CREATE_HEALTHCARE_SERVICE_ERROR:
      return state.set('error', action.error);
    case UPDATE_HEALTHCARE_SERVICE_SUCCESS:
      return state.set('error', false);
    case UPDATE_HEALTHCARE_SERVICE_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default manageHealthcareServicePageReducer;
