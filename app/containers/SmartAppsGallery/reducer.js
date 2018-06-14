/*
 *
 * SmartAppsGallery reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_APP_SHORTCUTS_SUCCESS } from './constants';


const initialState = fromJS({
  error: false,
  appShortcuts: null,
});

function smartAppsGalleryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_APP_SHORTCUTS_SUCCESS:
      return state.set('appShortcuts', fromJS(action.appShortcuts));
    default:
      return state;
  }
}

export default smartAppsGalleryReducer;
