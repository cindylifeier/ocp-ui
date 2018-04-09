/*
 *
 * ManageConsentPage reducer
 *
 */
import { fromJS } from 'immutable';
import { CREATE_CONSENT_ERROR, CREATE_CONSENT_SUCCESS } from './constants';

const initialState = fromJS({});

function manageConsentPageReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_CONSENT_SUCCESS:
      return state.set('error', false);
    case CREATE_CONSENT_ERROR:
      return state
        .set('loading', false)
        .set('data', fromJS([]));
    default:
      return state;
  }
}

export default manageConsentPageReducer;
