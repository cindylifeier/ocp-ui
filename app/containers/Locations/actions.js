/*
 *
 * Locations actions
 *
 */

import {
  SHOW_INACTIVE_LOCATIONS, SHOW_SUSPENDED_LOCATIONS,
  DEFAULT_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function showInActiveLocations(checked) {
  console.log('SHOW INACTIVE LOCATIONS: '.concat(checked));
  return {
    type: SHOW_INACTIVE_LOCATIONS,
    checked,
  };
}


export function showSuspendedLocations(checked) {
  console.log('SHOW SUSPENDED LOCATIONS: '.concat(checked));
  return {
    type: SHOW_SUSPENDED_LOCATIONS,
    checked,
  };
}
