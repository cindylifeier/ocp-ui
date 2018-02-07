/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  ADDRESSTYPE,
  ADDRESSUSE,
  ADMINISTRATIVEGENDER,
  CARETEAMCATEGORY,
  CARETEAMSTATUS,
  GET_LOOKUPS,
  GET_LOOKUPS_ERROR,
  GET_LOOKUPS_SUCCESS,
  LANGUAGE,
  LOCATIONIDENTIFIERSYSTEM,
  LOCATIONPHYSICALTYPE,
  LOCATIONSTATUS,
  ORGANIZATIONIDENTIFIERSYSTEM,
  ORGANIZATIONSTATUS,
  PARTICIPANTROLE,
  PARTICIPANTTYPE,
  PATIENTIDENTIFIERSYSTEM,
  PRACTITIONERIDENTIFIERSYSTEM,
  PRACTITIONERROLES,
  TELECOMSYSTEM,
  TELECOMUSE,
  USCOREBIRTHSEX,
  USCOREETHNICITY,
  USCORERACE,
  USPSSTATES,
  HEALTHCARESERVICECATEGORY,
  HEALTHCARESERVICEREFERRALMETHOD,
  HEALTHCARESERVICESPECIALITY,
  HEALTHCARESERVICETYPE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  USPSSTATES: [],
  LOCATIONPHYSICALTYPE: [],
  LOCATIONSTATUS: [],
  ADDRESSTYPE: [],
  ADDRESSUSE: [],
  LOCATIONIDENTIFIERSYSTEM: [],
  PRACTITIONERIDENTIFIERSYSTEM: [],
  PRACTITIONERROLES: [],
  TELECOMSYSTEM: [],
  TELECOMUSE: [],
  ORGANIZATIONIDENTIFIERSYSTEM: [],
  ORGANIZATIONSTATUS: [],
  PATIENTIDENTIFIERSYSTEM: [],
  ADMINISTRATIVEGENDER: [],
  USCORERACE: [],
  USCOREETHNICITY: [],
  USCOREBIRTHSEX: [],
  LANGUAGE: [],
  CARETEAMCATEGORY: [],
  PARTICIPANTTYPE: [],
  CARETEAMSTATUS: [],
  PARTICIPANTROLE: [],
  HEALTHCARESERVICECATEGORY: [],
  HEALTHCARESERVICETYPE: [],
  HEALTHCARESERVICEREFERRALMETHOD: [],
  HEALTHCARESERVICESPECIALITY: [],
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOOKUPS:
      return state
        .set('loading', true)
        .set('error', false);
    case GET_LOOKUPS_SUCCESS:
      return state
        .set(USPSSTATES, fromJS((action.lookups && action.lookups.uspsStates) || state.get(USPSSTATES)))
        .set(ADDRESSTYPE, fromJS((action.lookups && action.lookups.addressTypes) || state.get(ADDRESSTYPE)))
        .set(ADDRESSUSE, fromJS((action.lookups && action.lookups.addressUses) || state.get(ADDRESSUSE)))
        .set(LOCATIONIDENTIFIERSYSTEM, fromJS((action.lookups && action.lookups.locationIdentifierSystems) || state.get(LOCATIONIDENTIFIERSYSTEM)))
        .set(PRACTITIONERIDENTIFIERSYSTEM, fromJS((action.lookups && action.lookups.practitionerIdentifierSystems) || state.get(PRACTITIONERIDENTIFIERSYSTEM)))
        .set(TELECOMSYSTEM, fromJS((action.lookups && action.lookups.telecomSystems) || state.get(TELECOMSYSTEM)))
        .set(TELECOMUSE, fromJS((action.lookups && action.lookups.telecomUses) || state.get(TELECOMUSE)))
        .set(LOCATIONSTATUS, fromJS((action.lookups && action.lookups.locationStatuses) || state.get(LOCATIONSTATUS)))
        .set(LOCATIONPHYSICALTYPE, fromJS((action.lookups && action.lookups.locationPhysicalTypes) || state.get(LOCATIONPHYSICALTYPE)))
        .set(ORGANIZATIONIDENTIFIERSYSTEM, fromJS((action.lookups && action.lookups.organizationIdentifierSystems) || state.get(ORGANIZATIONIDENTIFIERSYSTEM)))
        .set(ORGANIZATIONSTATUS, fromJS((action.lookups && action.lookups.organizationStatuses) || state.get(ORGANIZATIONSTATUS)))
        .set(PRACTITIONERROLES, fromJS((action.lookups && action.lookups.practitionerRoles) || state.get(PRACTITIONERROLES)))
        .set(PATIENTIDENTIFIERSYSTEM, fromJS((action.lookups && action.lookups.patientIdentifierSystems) || state.get(PATIENTIDENTIFIERSYSTEM)))
        .set(ADMINISTRATIVEGENDER, fromJS((action.lookups && action.lookups.administrativeGenders) || state.get(ADMINISTRATIVEGENDER)))
        .set(USCORERACE, fromJS((action.lookups && action.lookups.usCoreRaces) || state.get(USCORERACE)))
        .set(USCOREETHNICITY, fromJS((action.lookups && action.lookups.usCoreEthnicities) || state.get(USCOREETHNICITY)))
        .set(USCOREBIRTHSEX, fromJS((action.lookups && action.lookups.usCoreBirthSex) || state.get(USCOREBIRTHSEX)))
        .set(LANGUAGE, fromJS((action.lookups && action.lookups.languages) || state.get(LANGUAGE)))
        .set(CARETEAMCATEGORY, fromJS((action.lookups && action.lookups.careTeamCategories) || state.get(CARETEAMCATEGORY)))
        .set(PARTICIPANTTYPE, fromJS((action.lookups && action.lookups.participantTypes) || state.get(PARTICIPANTTYPE)))
        .set(CARETEAMSTATUS, fromJS((action.lookups && action.lookups.careTeamStatuses) || state.get(CARETEAMSTATUS)))
        .set(PARTICIPANTROLE, fromJS((action.lookups && action.lookups.participantRoles) || state.get(PARTICIPANTROLE)))
        .set(HEALTHCARESERVICECATEGORY, fromJS((action.lookups && action.lookups.healthcareServiceCategories) || state.get(HEALTHCARESERVICECATEGORY)))
        .set(HEALTHCARESERVICETYPE, fromJS((action.lookups && action.lookups.healthcareServiceTypes) || state.get(HEALTHCARESERVICETYPE)))
        .set(HEALTHCARESERVICEREFERRALMETHOD, fromJS((action.lookups && action.lookups.healthcareServiceReferralMethods) || state.get(HEALTHCARESERVICEREFERRALMETHOD)))
        .set(HEALTHCARESERVICESPECIALITY, fromJS((action.lookups && action.lookups.healthcareServiceSpecialities) || state.get(HEALTHCARESERVICESPECIALITY)))
        .set('loading', false);
    case GET_LOOKUPS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
