/*
 *
 * SelectCareTeam reducer
 *
 */

import { fromJS } from 'immutable';
import Utils from 'utils/Util';
import {
GET_ACTORS_SUCCESS, GET_ACTORS_ERROR,
} from './constants';

const initialState = fromJS({
  actors: [],
});

function selectCareTeamReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACTORS_SUCCESS: {
      const selectedActorsAsArray = Utils.getFromState(state, 'selectedActors');
      const actors = action.actors;
      if (selectedActorsAsArray.length > 0) {
        for (let j = 0; j < actors.length; j += 1) {
          actors[j].checked = false;
        }

        for (let i = 0; i < selectedActorsAsArray.length; i += 1) {
          for (let j = 0; j < actors.length; j += 1) {
            if (actors[j].reference === selectedActorsAsArray[i].reference) {
              actors[j].checked = true;
            }
          }
        }
      }
      return state.set('actors', fromJS((actors) || []));
    }
    case GET_ACTORS_ERROR:
      return state;
    default:
      return state;
  }
}

export default selectCareTeamReducer;
