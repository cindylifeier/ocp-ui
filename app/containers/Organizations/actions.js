/*
 *
 * Organizations actions
 *
 */

import { LOAD_ORGANIZATIONS, LOAD_ORGANIZATIONS_ERROR, LOAD_ORGANIZATIONS_SUCCESS } from './constants';

export function loadOrganizations(searchValue, showInactive, searchType) {
  return {
    type: LOAD_ORGANIZATIONS,
    searchValue,
    showInactive,
    searchType,
  };
}

export function loadOrganizationsSuccess(organizations) {
  return {
    type: LOAD_ORGANIZATIONS_SUCCESS,
    organizations,
  };
}

export function loadOrganizationsError(err) {
  return {
    type: LOAD_ORGANIZATIONS_ERROR,
    err,
  };
}
