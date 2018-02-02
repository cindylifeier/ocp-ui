/*
 *
 * CareTeams actions
 *
 */

import { GET_CARE_TEAMS, GET_CARE_TEAMS_ERROR, GET_CARE_TEAMS_SUCCESS } from './constants';

export function getCareTeams(query, patientName) {
  return {
    type: GET_CARE_TEAMS,
    query,
    patientName,
  };
}

export function getCareTeamsSuccess(careTeamsPage) {
  return {
    type: GET_CARE_TEAMS_SUCCESS,
    careTeamsPage,
  };
}

export function getCareTeamsError(error) {
  return {
    type: GET_CARE_TEAMS_ERROR,
    error,
  };
}
