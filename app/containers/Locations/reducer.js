/*
 *
 * Locations reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_LOCATIONS, LOCATIONS,
  SHOW_INACTIVE_LOCATIONS,
  SHOW_SUSPENDED_LOCATIONS,
  HIDE_INACTIVE_LOCATIONS,
  HIDE_SUSPENDED_LOCATIONS,
} from './constants';

const initialState = fromJS({
  locations: [],
});

function locationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATIONS: {
      const filteredLocations = LOCATIONS.filter((item) => (item.status === 'Active'));
      return state.set('locations', filteredLocations);
    }
    case SHOW_INACTIVE_LOCATIONS: {
      const locations = state.get('locations');
      const filteredLocations = LOCATIONS.filter((item) => (item.status === 'Inactive'));
      return state.set('locations', locations.concat(filteredLocations));
    }
    case HIDE_INACTIVE_LOCATIONS: {
      const locations = state.get('locations');
      const filteredLocations = locations.filter((item) => (item.status === 'Active' || item.status === 'Suspended'));
      return state.set('locations', filteredLocations);
    }
    case SHOW_SUSPENDED_LOCATIONS: {
      const locations = state.get('locations');
      const filteredLocations = LOCATIONS.filter((item) => (item.status === 'Suspended'));
      return state.set('locations', locations.concat(filteredLocations));
    }
    case HIDE_SUSPENDED_LOCATIONS: {
      const locations = state.get('locations');
      const filteredLocations = locations.filter((item) => (item.status === 'Active' || item.status === 'Inactive'));
      return state.set('locations', filteredLocations);
    }
    default:
      return state;
  }
}

export default locationsReducer;
