/*
 *
 * WorkspaceSelectionPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_CARE_COORDINATORS_SUCCESS,
  GET_CARE_MANAGERS_SUCCESS,
  GET_ORGANIZATIONS_SUCCESS,
  GET_PATIENTS_SUCCESS,
} from 'containers/WorkspaceSelectionPage/constants';

const initialState = fromJS({
  organizations: {
    data: [],
  },
  careManagers: {
    data: [],
  },
  careCoordinators: {
    data: [],
  },
  patients: {
    data: [],
  },
});

function workspaceSelectionPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORGANIZATIONS_SUCCESS:
      return state
        .setIn(['organizations', 'data'], fromJS(action.organizations.elements));
    case GET_CARE_MANAGERS_SUCCESS:
      return state
        .setIn(['careManagers', 'data'], fromJS(action.careManagers.elements));
    case GET_CARE_COORDINATORS_SUCCESS:
      return state
        .setIn(['careCoordinators', 'data'], fromJS(action.careCoordinators.elements));
    case GET_PATIENTS_SUCCESS:
      return state
        .setIn(['patients', 'data'], fromJS(action.patients.elements));
    default:
      return state;
  }
}

export default workspaceSelectionPageReducer;
