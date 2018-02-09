/*
 *
 * ManageHealthcareServicePage reducer
 *
 */

import { fromJS } from 'immutable';
import { POST_HEALTHCARE_SERVICE_SUCCESS, POST_HEALTHCARE_SERVICE_ERROR } from './constants';

const initialState = fromJS({});

function manageHealthcareServicePageReducer(state = initialState, action) {
  switch (action.type) {
    case POST_HEALTHCARE_SERVICE_SUCCESS:
      return state.set('error', false);
    case POST_HEALTHCARE_SERVICE_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default manageHealthcareServicePageReducer;
