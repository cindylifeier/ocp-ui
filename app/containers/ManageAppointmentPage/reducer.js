/*
 *
 * ManageAppointmentPage reducer
 *
 */


import { fromJS } from 'immutable';
import Utils from 'utils/Util';
import {
  GET_APPOINTMENT_SUCCESS,
  INITIALIZE_MANAGE_APPOINTMENT,
  GET_HEALTHCARE_SERVICE_REFERENCES_SUCCESS,
  GET_LOCATION_REFERENCES_SUCCESS,
  GET_PRACTITIONER_REFERENCES_SUCCESS,
  GET_CARE_TEAM_REFERENCES_SUCCESS,
  GET_ADD_PARTICIPANTS,
} from './constants';

const initialState = fromJS({
  patient: null,
  appointment: null,
  healthcareServices: null,
  locations: null,
  practitioners: null,
  careTeams: null,
  selectedParticipants: null,
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
    case GET_ADD_PARTICIPANTS: {
      const appointment = Utils.getFromState(state, 'appointment');
      const participants = action.participants;
      console.log(appointment);
      console.log(participants);

      // if (selectedRecipientsAsArray.length > 0) {
      //   for (let j = 0; j < recipients.length; j += 1) {
      //     recipients[j].checked = false;
      //   }
      //
      //   for (let i = 0; i < selectedRecipientsAsArray.length; i += 1) {
      //     for (let j = 0; j < recipients.length; j += 1) {
      //       if (recipients[j].reference === selectedRecipientsAsArray[i].reference) {
      //         recipients[j].checked = true;
      //       }
      //     }
      //   }
      // }
      return state.set('selectedParticipants', fromJS((action.participants) || []));
    }
    default:
      return state;
  }
}

export default manageAppointmentPageReducer;
