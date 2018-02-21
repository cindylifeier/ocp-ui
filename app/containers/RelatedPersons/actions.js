/*
 *
 * RelatedPersons actions
 *
 */

import {
  GET_RELATED_PERSONS,
  INITIALIZE_RELATED_PERSONS,
} from './constants';


export function initializeRelatedPersons() {
  return {
    type: INITIALIZE_RELATED_PERSONS,
  };
}

export function getRelatedPersons(query, patientName, statusList) {
  return {
    type: GET_RELATED_PERSONS,
    query,
    patientName,
    statusList,
  };
}
