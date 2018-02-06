/*
 *
 * SearchParticipant actions
 *
 */

import {
  ADD_PARTICIPANT,
  DEFAULT_ACTION, INITIALIZE_SEARCH_PARTICIPANT, SEARCH_PARTICIPANT, SEARCH_PARTICIPANT_ERROR,
  SEARCH_PARTICIPANT_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getSearchParticipant(name, member) {
  return {
    type: SEARCH_PARTICIPANT,
    name,
    member,
  };
}

export function addParticipants(participants) {
  return {
    type: ADD_PARTICIPANT,
    participants,
  };
}


export function getSearchParticipantSuccess(searchParticipantResults) {
  return {
    type: SEARCH_PARTICIPANT_SUCCESS,
    searchParticipantResults,
  };
}

export function getSearchParticipantError(error) {
  return {
    type: SEARCH_PARTICIPANT_ERROR,
    error,
  };
}

export function initializeSearchParticipant() {
  return {
    type: INITIALIZE_SEARCH_PARTICIPANT,
  };
}
