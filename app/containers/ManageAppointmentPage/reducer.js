/*
 *
 * ManageAppointmentPage reducer
 *
 */


import { fromJS } from 'immutable';
import Utils from 'utils/Util';
import { uniqBy, filter } from 'lodash';

import {
  GET_APPOINTMENT_SUCCESS,
  INITIALIZE_MANAGE_APPOINTMENT,
  GET_HEALTHCARE_SERVICE_REFERENCES_SUCCESS,
  GET_LOCATION_REFERENCES_SUCCESS,
  GET_PRACTITIONER_REFERENCES_SUCCESS,
  GET_CARE_TEAM_REFERENCES_SUCCESS,
  REMOVE_APPOINTMENT_PARTICIPANT,
  GET_ADD_PARTICIPANTS,
} from './constants';

const initialState = fromJS({
  patient: null,
  appointment: null,
  healthcareServices: null,
  locations: null,
  practitioners: null,
  careTeams: null,
  selectedParticipants: [],
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
      const selectedParticipants = Utils.getFromState(state, 'selectedParticipants');
      const participants = action.participants;
      // Merge all participant
      const mergedArray = selectedParticipants.concat(participants);
      // Remove duplicate from the list
      const selectedParticipantsWitoutDuplicate = uniqBy(mergedArray, (e) => (e.reference));
      return state
        .set('selectedParticipants', fromJS((selectedParticipantsWitoutDuplicate) || []));
    }
    case REMOVE_APPOINTMENT_PARTICIPANT: {
      const participants = state.get('selectedParticipants');
      const participantsAsArray = participants.toJS();
      const filteredParticipants = filter(participantsAsArray, (e) => (e.reference !== action.participant.reference));
      return state
        .set('selectedParticipants', fromJS((filteredParticipants) || []));
    }
    default:
      return state;
  }
}

export default manageAppointmentPageReducer;
