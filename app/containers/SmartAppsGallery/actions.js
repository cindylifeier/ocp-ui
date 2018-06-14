/*
 *
 * SmartAppsGallery actions
 *
 */

import { GET_APP_SHORTCUTS, GET_APP_SHORTCUTS_ERROR, GET_APP_SHORTCUTS_SUCCESS } from './constants';


export function getAppShortcuts() {
  return {
    type: GET_APP_SHORTCUTS,
  };
}

export function getAppShortcutsSuccess(appShortcuts) {
  return {
    type: GET_APP_SHORTCUTS_SUCCESS,
    appShortcuts,
  };
}

export function getAppShortcutsError(error) {
  return {
    type: GET_APP_SHORTCUTS_ERROR,
    error,
  };
}
