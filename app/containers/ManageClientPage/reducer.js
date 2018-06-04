/*
 *
 * ManageClientPage reducer
 *
 */

import { fromJS } from 'immutable';
import remove from 'lodash/remove';
import { GET_CLIENTS_SUCCESS, SAVE_CLIENT_SUCCESS, DELETE_CLIENT_SUCCESS } from './constants';

const initialState = fromJS({ clients: [] });

function manageClientPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENTS_SUCCESS:
      return state.set('clients', fromJS(action.clients));
    case SAVE_CLIENT_SUCCESS: {
      const clients = state.get('clients').toJS();
      return state.set('clients', fromJS(clients.concat(action.clientMetaDto)));
    }
    case DELETE_CLIENT_SUCCESS: {
      const clients = state.get('clients').toJS();
      return state.set('clients', fromJS(remove(clients, { client_id: action.id })));
    }
    default:
      return state;
  }
}

export default manageClientPageReducer;
