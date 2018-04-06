/*
 *
 * AttestConsentPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_CONSENT_ERROR, GET_CONSENT_SUCCESS,
} from './constants';

const initialState = fromJS({
  error: false,
  consent: null,
});

function attestConsentPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONSENT_SUCCESS:
      return state
        .set('consent', action.consent);
    case GET_CONSENT_ERROR:
      return state
        .set('error', action.error);
    default:
      return state;
  }
}

export default attestConsentPageReducer;
