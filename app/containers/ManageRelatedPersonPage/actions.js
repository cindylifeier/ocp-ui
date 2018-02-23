/*
 *
 * ManageRelatedPersonPage actions
 *
 */

import {
  CREATE_RELATED_PERSON, SAVE_RELATED_PERSON_ERROR, UPDATE_RELATED_PERSON,
} from './constants';

export function createRelatedPerson(relatedPerson, handleSubmitting) {
  return {
    type: CREATE_RELATED_PERSON,
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
    type: UPDATE_RELATED_PERSON,
    relatedPerson,
    handleSubmitting,
  };
}

