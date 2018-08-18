/*
 *
 * NewPractitionerResource reducer
 *
 */

import { fromJS } from 'immutable';
import isEmpty from 'lodash/isEmpty';
import {
  FIND_PRACTITIONER,
  FIND_PRACTITIONER_ERROR,
  FIND_PRACTITIONER_SUCCESS,
  INITIALIZE_FIND_PRACTITIONER,
} from './constants';


const initialState = fromJS({
  loading: false,
  practitioner: null,
  exists: false,
  error: false,
});

function newPractitionerResourceReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_FIND_PRACTITIONER:
      return initialState;
    case FIND_PRACTITIONER:
      return state
        .set('loading', true)
        .set('practitioner', null)
        .set('exists', false)
        .set('error', false);
    case FIND_PRACTITIONER_SUCCESS:
      return state
        .set('loading', false)
        .set('exists', !isEmpty(action.practitioner))
        .set('practitioner', fromJS(action.practitioner))
        .setIn(['queryParameters', 'firstName'], action.queryParameters.firstName)
        .setIn(['queryParameters', 'lastName'], action.queryParameters.lastName)
        .setIn(['queryParameters', 'identifierType'], action.queryParameters.identifierType)
        .setIn(['queryParameters', 'identifier'], action.queryParameters.identifier);
    case FIND_PRACTITIONER_ERROR:
      return state
        .set('loading', false)
        .set('exists', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default newPractitionerResourceReducer;
