/*
 *
 * ManageAppointmentPage reducer
 *
 */


import { fromJS } from 'immutable';
import {
  GET_APPOINTMENT_SUCCESS,
  INITIALIZE_MANAGE_APPOINTMENT,
  GET_HEALTHCARE_SERVICE_REFERENCES_SUCCESS,
  GET_LOCATION_REFERENCES_SUCCESS,
  GET_PRACTITIONER_REFERENCES_SUCCESS,
  GET_CARE_TEAM_REFERENCES_SUCCESS,
} from './constants';

const initialState = fromJS({
  patient: null,
  appointment: null,
  healthcareServices: null,
  locations: null,
  practitioners: null,
  careTeams: null,
});

function manageAppointmentPageReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_MANAGE_APPOINTMENT:
      return initialState;
    case GET_APPOINTMENT_SUCCESS:
      return state
        .set('appointment', action.appointment);
    case GET_HEALTHCARE_SERVICE_REFERENCES_SUCCESS:
      return state
        .set('healthcareServices', action.healthcareServices);
    case GET_LOCATION_REFERENCES_SUCCESS:
      return state
        .set('locations', action.locations);
    case GET_PRACTITIONER_REFERENCES_SUCCESS:
      return state
        .set('practitioners', action.practitioners);
    case GET_CARE_TEAM_REFERENCES_SUCCESS:
      return state
        .set('careTeams', action.careTeams);
    default:
      return state;
  }
}

export default manageAppointmentPageReducer;
