/*
 *
 * PractitionerToDos reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_PRACTITIONER_TO_DOS,
  GET_PRACTITIONER_TO_DOS_ERROR,
  GET_PRACTITIONER_TO_DOS_SUCCESS,
} from 'containers/PractitionerToDos/constants';


const initialState = fromJS({
  data: [],
  loading: false,
});

function practitionerToDosReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRACTITIONER_TO_DOS:
      return state.set('loading', true);
    case GET_PRACTITIONER_TO_DOS_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('data', fromJS((action.toDos) || []));
    case GET_PRACTITIONER_TO_DOS_ERROR:
      return state
        .set('error', true)
        .set('loading', false);
    default:
      return state;
  }
}

export default practitionerToDosReducer;
