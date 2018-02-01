/*
 *
 * CareTeams reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_CARE_TEAMS_SUCCESS } from './constants';

const initialState = fromJS({});

function careTeamsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CARE_TEAMS_SUCCESS:
      return fromJS(action.careTeamsPage);
    default:
      return state;
  }
}

export default careTeamsReducer;
