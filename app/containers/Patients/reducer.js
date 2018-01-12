/*
 *
 * Patients reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_PATIENT_SEARCH_RESULT,
  SEARCH_PATIENTS_ERROR,
  SEARCH_PATIENTS_SUCCESS,
  SEARCH_TYPE,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  searchTerms: '',
  searchType: SEARCH_TYPE.NAME,
  includeInactive: false,
  searchPatients: {
    result: false,
  },
});

function patientsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PATIENT_SEARCH_RESULT:
      return state
        .set('loading', true)
        .set('error', false)
        .set('searchType', action.searchType)
        .set('searchTerms', action.searchTerms)
        .set('includeInactive', action.includeInactive)
        .setIn(['searchPatients', 'result'], false);
    case SEARCH_PATIENTS_SUCCESS:
      return state
        .setIn(['searchPatients', 'result'], action.searchResult)
        .set('loading', false);
    case SEARCH_PATIENTS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default patientsReducer;
