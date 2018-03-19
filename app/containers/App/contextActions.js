/*
 *
 * Context actions
 *
 */

import {
  SET_PATIENT,
  SET_ORGANIZATION,
  SET_LOCATION,
  SET_USER,
  CLEAR_PATIENT,
  CLEAR_ORGANIZATION,
  CLEAR_LOCATION,
  CLEAR_USER,
  CLEAR_ALL,
  REFRESH_PATIENT,
  REFRESH_ORGANIZATION,
  REFRESH_LOCATION,
  REFRESH_USER,
} from './contextConstants';

export function setPatient(patient) {
  return {
    type: SET_PATIENT,
    patient,
  };
}

export function setOrganization(organization) {
  return {
    type: SET_ORGANIZATION,
    organization,
  };
}

export function setLocation(location) {
  return {
    type: SET_LOCATION,
    location,
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function clearPatient() {
  return {
    type: CLEAR_PATIENT,
  };
}

export function clearOrganization() {
  return {
    type: CLEAR_ORGANIZATION,
  };
}

export function clearLocation() {
  return {
    type: CLEAR_LOCATION,
  };
}

export function clearUser() {
  return {
    type: CLEAR_USER,
  };
}

export function clearAll() {
  return {
    type: CLEAR_ALL,
  };
}

export function refreshPatient() {
  return {
    type: REFRESH_PATIENT,
  };
}

export function refreshOrganization() {
  return {
    type: REFRESH_ORGANIZATION,
  };
}

export function refreshLocation() {
  return {
    type: REFRESH_LOCATION,
  };
}

export function refreshUser() {
  return {
    type: REFRESH_USER,
  };
}
