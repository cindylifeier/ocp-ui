/*
 *
 * SearchAppointmentParticipant reducer
 *
 */

import { fromJS } from 'immutable';
import { filter, uniqBy } from 'lodash';
import Utils from 'utils/Util';
import {
  ADD_APPOINTMENT_PARTICIPANT,
  INITIALIZE_SEARCH_APPOINTMENT_PARTICIPANT,
  INITIALIZE_SEARCH_APPOINTMENT_PARTICIPANT_RESULT,
  REMOVE_APPOINTMENT_PARTICIPANT,
  SEARCH_APPOINTMENT_PARTICIPANT_ERROR,
  SEARCH_APPOINTMENT_PARTICIPANT_SUCCESS,
  GET_CARE_TEAM_REFERENCES_SUCCESS,
  GET_HEALTHCARE_SERVICE_REFERENCES_SUCCESS,
  GET_LOCATION_REFERENCES_SUCCESS,
  GET_PRACTITIONER_REFERENCES_SUCCESS,
} from './constants';


const initialState = fromJS({
  searchParticipantResult: [],
  selectedParticipants: [],
  healthcareServices: null,
  locations: null,
  practitioners: null,
  careTeams: null,
});

function searchAppointmentParticipantReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_APPOINTMENT_PARTICIPANT_SUCCESS:
      return state
        .set('searchParticipantResult', fromJS((action.searchParticipantResults && action.searchParticipantResults.elements) || []));
    case INITIALIZE_SEARCH_APPOINTMENT_PARTICIPANT_RESULT:
      return state
        .set('searchParticipantResult', fromJS([]));
    case INITIALIZE_SEARCH_APPOINTMENT_PARTICIPANT:
      return state
        .set('selectedParticipants', fromJS((action.initialSelectedParticipants) || []))
        .set('searchParticipantResult', fromJS([]));
    case SEARCH_APPOINTMENT_PARTICIPANT_ERROR:
      return state;
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
    case ADD_APPOINTMENT_PARTICIPANT: {
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

export default searchAppointmentParticipantReducer;
