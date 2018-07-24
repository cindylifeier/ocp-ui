/*
 *
 * UserRegistration actions
 *
 */

import {
  SEARCH_RESOURCES, SEARCH_RESOURCES_ERROR,
  SEARCH_RESOURCES_SUCCESS,
} from './constants';

export function searchResources(searchType, searchValue, resourceType, includeInactive, currentPage) {
  return {
    type: SEARCH_RESOURCES,
    searchType,
    searchValue,
    resourceType,
    includeInactive,
    currentPage,
  };
}

export function searchResourcesSuccess(resources) {
  return {
    type: SEARCH_RESOURCES_SUCCESS,
    resources,
  };
}

export function searchPractitionersError(error) {
  return {
    type: SEARCH_RESOURCES_ERROR,
    error,
  };
}
