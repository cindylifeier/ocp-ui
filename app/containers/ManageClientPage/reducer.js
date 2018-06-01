/*
 *
 * ManageClientPage reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_CLIENTS_SUCCESS } from './constants';

const initialState = fromJS({ clients: [] });

function manageClientPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENTS_SUCCESS:
      return state.set('clients', fromJS(action.clients));
    default:
      return state;
  }
}

export default manageClientPageReducer;
