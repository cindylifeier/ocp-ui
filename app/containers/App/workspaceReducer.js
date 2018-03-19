/*
 *
 * workspaceReducer
 *
 */

import { fromJS } from 'immutable';
import { SET_WORKFLOW_ROLE } from 'containers/WorkspaceSelectionPage/constants';

const initialState = fromJS({
  workflowRole: null,
});

// Todo: will remove after integrate with context
function workspaceReducer(state = initialState, action) {
  switch (action.type) {
    case SET_WORKFLOW_ROLE:
      return state.set('workflowRole', fromJS(action.workflowRole));
    default:
      return state;
  }
}

export default workspaceReducer;
