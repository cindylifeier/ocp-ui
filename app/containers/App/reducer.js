/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  GET_LOOKUPS,
  GET_LOOKUPS_SUCCESS,
  GET_LOOKUPS_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  uspsStates: [],
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOOKUPS:
      return state
        .set('loading', true)
        .set('error', false);
    case GET_LOOKUPS_SUCCESS:
      return state
        .set('uspsStates', fromJS((action.lookups.uspsStates && action.lookups.uspsStates) || []))
        .set('loading', false);
    case GET_LOOKUPS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
