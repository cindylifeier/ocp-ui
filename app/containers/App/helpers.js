/**
 * Helpers is a collection of useful common shared functions are used by OCP Domain containers
 *
 */

import {
  ADMIN_WORKSPACE,
  CARE_COORDINATOR_ROLE_VALUE,
  CARE_MANAGER_ROLE_VALUE, OCP_ADMIN_ROLE_VALUE, PATIENT_ROLE_VALUE, PATIENT_WORKSPACE,
  PRACTITIONER_WORKSPACE, WORKSPACE_SELECTION_URL,
} from 'containers/App/constants';

export function getLinkUrlByRole(role) {
  let linkUrl;
  switch (role) {
    case OCP_ADMIN_ROLE_VALUE:
      linkUrl = ADMIN_WORKSPACE;
      break;
    case CARE_MANAGER_ROLE_VALUE:
      linkUrl = PRACTITIONER_WORKSPACE;
      break;
    case CARE_COORDINATOR_ROLE_VALUE:
      linkUrl = PRACTITIONER_WORKSPACE;
      break;
    case PATIENT_ROLE_VALUE:
      linkUrl = PATIENT_WORKSPACE;
      break;
    default:
      linkUrl = WORKSPACE_SELECTION_URL;
  }
  return linkUrl;
}
