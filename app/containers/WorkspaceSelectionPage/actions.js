/*
 *
 * WorkspaceSelectionPage actions
 *
 */

import { SET_WORKFLOW_ROLE } from './constants';

export function setWorkflowRole(workflowRole) {
  return {
    type: SET_WORKFLOW_ROLE,
    workflowRole,
  };
}
