/*
 *
 * SelectCareTeam actions
 *
 */
import { GET_ACTORS, GET_ACTORS_ERROR, GET_ACTORS_SUCCESS } from './constants';

export function getActors(patientId) {
  return {
    type: GET_ACTORS,
    patientId,
  };
}

export function getActorsSuccess(actors) {
  return {
    type: GET_ACTORS_SUCCESS,
    actors,
  };
}


export function getActorsError(error) {
  return {
    type: GET_ACTORS_ERROR,
    error,
  };
}
