/*
 *
 * CareTeams reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_CARE_TEAMS, GET_CARE_TEAMS_ERROR, GET_CARE_TEAMS_SUCCESS } from './constants';

const initialState = fromJS({ loading: false });

function careTeamsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CARE_TEAMS:
      return state.set('loading', true);
    case GET_CARE_TEAMS_SUCCESS:
      return state
        .set('data', fromJS(action.careTeamsPage))
        .set('loading', false);
    case GET_CARE_TEAMS_ERROR:
      return state.set('loading', false);
    default:
      return state;
  }
}

export default careTeamsReducer;
