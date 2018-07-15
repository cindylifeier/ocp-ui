/*
 *
 * ManageRelatedPersonModal actions
 *
 */

import {
  REMOVE_RELATED_PERSON,
  REMOVE_RELATED_PERSON_SUCCESS,
  REMOVE_RELATED_PERSON_ERROR,
  SEARCH_RELATED_PERSONS,
  SEARCH_RELATED_PERSONS_ERROR,
  SEARCH_RELATED_PERSONS_SUCCESS,
} from './constants';

export function searchRelatedPersons(careTeamId, currentPage, searchTerms) {
  return {
    type: SEARCH_RELATED_PERSONS,
    careTeamId,
    currentPage,
    searchTerms,
  };
}

export function searchRelatedPersonsSuccess(relatedPersons) {
  return {
    type: SEARCH_RELATED_PERSONS_SUCCESS,
    relatedPersons,
  };
}

export function searchRelatedPersonsError(error) {
  return {
    type: SEARCH_RELATED_PERSONS_ERROR,
    error,
  };
}

export function removeRelatedPerson(careTeamId, relatedPerson) {
  return {
    type: REMOVE_RELATED_PERSON,
    relatedPerson,
  };
}

export function removeRelatedPersonSuccess() {
  return {
    type: REMOVE_RELATED_PERSON_SUCCESS,
  };
}

export function removeRelatedPersonError(error) {
  return {
    type: REMOVE_RELATED_PERSON_ERROR,
    error,
  };
}
