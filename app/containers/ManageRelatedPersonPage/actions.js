/*
 *
 * ManageRelatedPersonPage actions
 *
 */

import {
  POST_RELATED_PERSON, SAVE_RELATED_PERSON_ERROR, PUT_RELATED_PERSON,
} from './constants';

export function createRelatedPerson(relatedPerson, handleSubmitting) {
  return {
    type: POST_RELATED_PERSON,
    relatedPerson,
    handleSubmitting,
  };
}

export function saveRelatedPersonError(error) {
  return {
    type: SAVE_RELATED_PERSON_ERROR,
    error,
  };
}

export function updateRelatedPerson(relatedPerson, handleSubmitting) {
  return {
    type: PUT_RELATED_PERSON,
    relatedPerson,
    handleSubmitting,
  };
}

