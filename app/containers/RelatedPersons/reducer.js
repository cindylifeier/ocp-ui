/*
 *
 * RelatedPersons reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_RELATED_PERSONS_SUCCESS, INITIALIZE_RELATED_PERSONS,
} from './constants';

const initialState = fromJS({
  data: {},
});

function relatedPersonsReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_RELATED_PERSONS:
      return initialState;
    case GET_RELATED_PERSONS_SUCCESS:
      return state
        .set('data', fromJS((action.relatedPersons) || {}));
    default:
      return state;
  }
}

export default relatedPersonsReducer;
