/*
 *
 * Organizations actions
 *
 */

import {
  INITIALIZE_ORGANIZATIONS,
  LOAD_ORGANIZATIONS,
  LOAD_ORGANIZATIONS_ERROR,
  LOAD_ORGANIZATIONS_SUCCESS,
} from './constants';

export function initializeOrganizations() {
  return {
    type: INITIALIZE_ORGANIZATIONS,
  };
}

export function loadOrganizations(searchValue, showInactive, searchType, currentPage) {
  return {
    type: LOAD_ORGANIZATIONS,
    searchValue,
    showInactive,
    searchType,
    currentPage,
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
