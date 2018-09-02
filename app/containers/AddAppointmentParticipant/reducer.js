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
  SEARCH_PARTICIPANT_SUCCESS,
} from './constants';

const initialState = fromJS({
  healthcareServices: null,
  locations: null,
  practitioners: null,
  loading: false,
  data: null,
  currentPage: 0,
  totalNumberOfPages: 0,
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
    case SEARCH_PARTICIPANT_SUCCESS:
      return state
        .set('loading', false)
        .set('data', fromJS(action.participants.elements))
        .set('totalElements', action.participants.totalElements)
        .set('currentPageSize', action.participants.currentPageSize)
        .set('totalNumberOfPages', action.participants.totalNumberOfPages)
        .set('currentPage', action.participants.currentPage);
    default:
      return state;
  }
}

export default addAppointmentParticipantReducer;
