/*
 *
 * CareTeams reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_CARE_TEAMS, GET_CARE_TEAMS_ERROR, GET_CARE_TEAMS_SUCCESS } from './constants';

const initialState = fromJS({
  loading: false,
  patientName: null,
  data: null,
  query: null,
});

function careTeamsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CARE_TEAMS:
      return state
        .set('loading', true)
        .set('data', null)
        .set('patientName', action.patientName)
        .set('query', fromJS(action.query));
    case GET_CARE_TEAMS_SUCCESS:
      return state
        .set('loading', false)
        .set('data', fromJS(action.careTeamsPage || {}));
    case GET_CARE_TEAMS_ERROR:
      return state.set('loading', false);
    default:
      return state;
  }
}

export default careTeamsReducer;
