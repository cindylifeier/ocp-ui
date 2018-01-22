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
  GET_LOCATION_LOOKUPS,
  GET_LOOKUPS_SUCCESS,
  GET_LOOKUPS_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  uspsStates: [],
  locationTypes: [],
  locationStatuses: [],
  addressTypes: [],
  addressUses: [],
  identifierSystems: [],
  telecomSystems: [],
  telecomUses: [],
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATION_LOOKUPS:
      return state
        .set('loading', true)
        .set('error', false);
    case GET_LOOKUPS_SUCCESS:
      return state
        .set('uspsStates', fromJS((action.lookups && action.lookups.uspsStates) || state.get('uspsStates')))
        .set('addressTypes', fromJS((action.lookups && action.lookups.addressTypes) || state.get('addressTypes')))
        .set('addressUses', fromJS((action.lookups && action.lookups.addressUses) || state.get('addressUses')))
        .set('identifierSystems', fromJS((action.lookups && action.lookups.identifierSystems) || state.get('identifierSystems')))
        .set('telecomSystems', fromJS((action.lookups && action.lookups.telecomSystems) || state.get('telecomSystems')))
        .set('telecomUses', fromJS((action.lookups && action.lookups.telecomUses) || state.get('telecomUses')))
        .set('locationStatuses', fromJS((action.lookups && action.lookups.locationStatuses) || state.get('locationStatuses')))
        .set('locationTypes', fromJS((action.lookups && action.lookups.locationTypes) || state.get('locationTypes')))
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
