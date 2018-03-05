/*
 *
 * ManagePractitionerPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_PRACTITIONER_ERROR,
  GET_PRACTITIONER_SUCCESS,
  INITIALIZE_MANAGE_PRACTITIONER,
  SAVE_PRACTITIONER,
  SAVE_PRACTITIONER_ERROR,
  GET_ORGANIZATIONS, GET_ORGANIZATIONS_ERROR, GET_ORGANIZATIONS_SUCCESS,
} from './constants';

const initialState = fromJS({
  error: false,
  practitioner: null,
  loading: false,
  data: [],
  currentPage: 0,
  totalNumberOfPages: 0,
});

function managePractitionerPageReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_MANAGE_PRACTITIONER:
      return initialState;
    case SAVE_PRACTITIONER:
      return state
        .set('error', false);
    case SAVE_PRACTITIONER_ERROR:
      return state
        .set('error', action.error);
    case GET_PRACTITIONER_SUCCESS:
      return state
        .set('practitioner', action.practitioner);
    case GET_PRACTITIONER_ERROR:
      return state
        .set('error', action.error);
    case GET_ORGANIZATIONS:
      return state
        .set('loading', true);
    case GET_ORGANIZATIONS_SUCCESS:
      return state
        .set('loading', false)
        .set('data', fromJS(action.organizations.elements))
        .setIn(['totalNumberOfPages'], action.organizations.totalNumberOfPages)
        .setIn(['currentPage'], action.organizations.currentPage);
    case GET_ORGANIZATIONS_ERROR:
      return state
        .set('loading', false)
        .set('data', fromJS([]));
    default:
      return state;
  }
}

export default managePractitionerPageReducer;
