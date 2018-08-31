/*
 *
 * AddAppointmentParticipant reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_HEALTHCARE_SERVICE_REFERENCES_SUCCESS,
  GET_LOCATION_REFERENCES_SUCCESS,
  GET_PRACTITIONER_REFERENCES_SUCCESS,
} from './constants';

const initialState = fromJS({
  healthcareServices: null,
  locations: null,
  practitioners: null,
});

function addAppointmentParticipantReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HEALTHCARE_SERVICE_REFERENCES_SUCCESS:
      return state
        .set('healthcareServices', action.healthcareServices);
    case GET_LOCATION_REFERENCES_SUCCESS:
      return state
        .set('locations', action.locations);
    case GET_PRACTITIONER_REFERENCES_SUCCESS:
      return state
        .set('practitioners', action.practitioners);
    default:
      return state;
  }
}

export default addAppointmentParticipantReducer;
