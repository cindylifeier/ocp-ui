/*
 *
 * Locations reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, SHOW_INACTIVE_LOCATIONS, SHOW_SUSPENDED_LOCATIONS,
} from './constants';

const initialState = fromJS({});

function locationsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SHOW_INACTIVE_LOCATIONS:
      // console.log(state);
      // console.log('In reducer SHOW_INACTIVE_LOCATIONS : '.concat(action.checked))
      return state;
    case SHOW_SUSPENDED_LOCATIONS:
      // console.log(state);
      // console.log('In reducer SHOW_SUSPENDED_LOCATIONS : '.concat(action.checked))
      return state;
    default:
      return state;
  }
}

export default locationsReducer;
