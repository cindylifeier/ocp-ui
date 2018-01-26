/*
 *
 * ManageOrganizationPage actions
 *
 */

import { CREATE_ORGANIZATION } from './constants';

export function createOrganization(organization, callback) {
  return {
    type: CREATE_ORGANIZATION,
    organization,
    callback,
  };
}
