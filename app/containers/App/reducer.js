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

import { combineReducers } from 'redux-immutable';
import lookupReducer from './lookupReducer';
import authReducer from './authReducer';
import workspaceReducer from './workspaceReducer';

export default combineReducers({
  auth: authReducer,
  lookup: lookupReducer,
  // Todo: will remove after integrate with context
  workspace: workspaceReducer,
});
