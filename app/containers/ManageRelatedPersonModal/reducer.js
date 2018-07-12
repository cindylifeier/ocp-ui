/*
 *
 * ManageRelatedPersonModal reducer
 *
 */

import { fromJS } from 'immutable';
import { SEARCH_RELATED_PERSONS, SEARCH_RELATED_PERSONS_ERROR, SEARCH_RELATED_PERSONS_SUCCESS } from './constants';

const initialState = fromJS({
  loading: false,
  data: [],
  currentPage: 0,
  totalNumberOfPages: 0,
  error: false,
});

function manageRelatedPersonModalReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_RELATED_PERSONS:
      return state
        .set('loading', true);
    case SEARCH_RELATED_PERSONS_SUCCESS:
      return state
        .set('loading', false)
        .set('data', fromJS(action.relatedPersons.elements))
        .set('totalElements', action.relatedPersons.totalElements)
        .set('currentPageSize', action.relatedPersons.currentPageSize)
        .set('totalNumberOfPages', action.relatedPersons.totalNumberOfPages)
        .set('currentPage', action.relatedPersons.currentPage);
    case SEARCH_RELATED_PERSONS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default manageRelatedPersonModalReducer;
