/*
 *
 * ManageRelatedPersonPage actions
 *
 */

import {
  POST_RELATED_PERSON, POST_RELATED_PERSON_ERROR, PUT_RELATED_PERSON,
  PUT_RELATED_PERSON_ERROR,
  PUT_RELATED_PERSON_SUCCESS,
} from './constants';

export function createRelatedPerson(relatedPerson) {
  return {
    type: POST_RELATED_PERSON,
    relatedPerson,
  };
}

export function createRelatedPersonError(error) {
  return {
    type: POST_RELATED_PERSON_ERROR,
    error,
  };
}

export function updateRelatedPerson(relatedPerson) {
  return {
    type: PUT_RELATED_PERSON,
    relatedPerson,
  };
}


export function updateRelatedPersonSuccess(response) {
  return {
    type: PUT_RELATED_PERSON_SUCCESS,
    response,
  };
}


export function updateRelatedPersonError(error) {
  return {
    type: PUT_RELATED_PERSON_ERROR,
    error,
  };
}

