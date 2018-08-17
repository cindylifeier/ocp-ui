/*
 *
 * NewPractitionerResource reducer
 *
 */

import { fromJS } from 'immutable';
import { FIND_PRACTITIONER, FIND_PRACTITIONER_ERROR, FIND_PRACTITIONER_SUCCESS } from './constants';


const initialState = fromJS({
  loading: false,
  practitioner: null,
  queryData: null,
  error: false,
});

function newPractitionerResourceReducer(state = initialState, action) {
  switch (action.type) {
    case FIND_PRACTITIONER:
      return state
        .set('loading', true)
        .setIn(['queryData', 'firstName'], action.firstName)
        .setIn(['queryData', 'lastName'], action.lastName)
        .setIn(['queryData', 'identifierType'], action.identifierType)
        .setIn(['queryData', 'identifier'], action.identifier);
    case FIND_PRACTITIONER_SUCCESS:
      return state
        .set('loading', false)
        .set('practitioner', fromJS(action.practitioner));
    case FIND_PRACTITIONER_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default newPractitionerResourceReducer;
