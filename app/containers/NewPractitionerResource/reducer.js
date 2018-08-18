/*
 *
 * NewPractitionerResource reducer
 *
 */

import { fromJS } from 'immutable';
import {
  FIND_PRACTITIONER,
  FIND_PRACTITIONER_ERROR,
  FIND_PRACTITIONER_SUCCESS,
  INITIALIZE_FIND_PRACTITIONER,
} from './constants';


const initialState = fromJS({
  loading: false,
  practitioner: null,
  error: false,
});

function newPractitionerResourceReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_FIND_PRACTITIONER:
      return initialState;
    case FIND_PRACTITIONER:
      return state
        .set('loading', true);
    case FIND_PRACTITIONER_SUCCESS:
      return state
        .set('loading', false)
        .set('practitioner', fromJS(action.practitioner))
        .setIn(['queryParameters', 'firstName'], action.queryParameters.firstName)
        .setIn(['queryParameters', 'lastName'], action.queryParameters.lastName)
        .setIn(['queryParameters', 'identifierType'], action.queryParameters.identifierType)
        .setIn(['queryParameters', 'identifier'], action.queryParameters.identifier);
    case FIND_PRACTITIONER_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default newPractitionerResourceReducer;
