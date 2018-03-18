/*
 *
 * Organizations actions
 *
 */

import {
  SEARCH_ORGANIZATIONS,
  SEARCH_ORGANIZATIONS_ERROR,
  SEARCH_ORGANIZATIONS_SUCCESS,
  INITIALIZE_ORGANIZATIONS,
} from './constants';

export function initializeOrganizations() {
  return {
    type: INITIALIZE_ORGANIZATIONS,
  };
}

export function searchOrganizations(searchValue, showInactive, searchType, currentPage) {
  return {
    type: SEARCH_ORGANIZATIONS,
    searchValue,
    showInactive,
    searchType,
    currentPage,
  };
}

export function searchOrganizationsSuccess(organizations) {
  return {
    type: SEARCH_ORGANIZATIONS_SUCCESS,
    organizations,
  };
}

export function searchOrganizationsError(err) {
  return {
    type: SEARCH_ORGANIZATIONS_ERROR,
    err,
  };
}
