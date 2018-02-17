/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST } from './constants';

const initialState = fromJS({
  isAuthenticating: false,
  isAuthenticated: false,
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state.set('isAuthenticating', true);
    case LOGIN_SUCCESS:
      return state
        .set('isAuthenticating', false)
        .set('isAuthenticated', action.isAuthenticated);
    case LOGOUT_REQUEST:
      return initialState;
    default:
      return state;
  }
}

export default loginPageReducer;
