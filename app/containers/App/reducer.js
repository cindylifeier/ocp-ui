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
  GET_US_STATES,
  GET_US_STATES_SUCCESS,
  GET_US_STATES_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  usState: [],
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case GET_US_STATES:
      return state
        .set('loading', true)
        .set('error', false);
    case GET_US_STATES_SUCCESS:
      return state
        .setIn('usStates', action.usStates)
        .set('loading', false)
        .set('currentUser', action.username);
    case GET_US_STATES_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
