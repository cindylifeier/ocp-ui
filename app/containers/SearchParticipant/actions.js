/*
 *
 * SearchParticipant actions
 *
 */

import {
  DEFAULT_ACTION, SEARCH_PARTICIPANT, SEARCH_PARTICIPANT_ERROR, SEARCH_PARTICIPANT_SUCCESS,
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

export function getSearchParticipantSuccess(participants) {
  return {
    type: SEARCH_PARTICIPANT_SUCCESS,
    participants,
  };
}

export function getSearchParticipantError(error) {
  return {
    type: SEARCH_PARTICIPANT_ERROR,
    error,
  };
}
