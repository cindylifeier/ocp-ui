import { fromJS } from 'immutable';

import {
  ACTION_PARTICIPANT_ROLE,
  ACTION_PARTICIPANT_TYPE,
  ADDRESSTYPE,
  ADDRESSUSE,
  ADMINISTRATIVEGENDER,
  CARETEAMCATEGORY,
  CARETEAMREASON,
  CARETEAMSTATUS,
  DEFINITION_TOPIC,
  GET_LOOKUPS,
  GET_LOOKUPS_ERROR,
  GET_LOOKUPS_SUCCESS,
  HEALTHCARESERVICECATEGORY,
  HEALTHCARESERVICEREFERRALMETHOD,
  HEALTHCARESERVICESPECIALITY,
  HEALTHCARESERVICESTATUS,
  HEALTHCARESERVICETYPE,
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
  PUBLICATION_STATUS,
  RELATEDPERSONPATIENTRELATIONSHIPTYPES,
  RESOURCE_TYPE,
  TELECOMSYSTEM,
  TELECOMUSE,
  USCOREBIRTHSEX,
  USCOREETHNICITY,
  USCORERACE,
  USPSSTATES,
  // Task Resource Lookups - Start
  TASK_STATUS,
  REQUEST_INTENT,
  REQUEST_PRIORITY,
  TASK_PERFORMER_TYPE,
  // Task Resource Lookups - End
} from './constants';

// The initial state of the lookup
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
  CARETEAMREASON: [],
  HEALTHCARESERVICECATEGORY: [],
  HEALTHCARESERVICETYPE: [],
  HEALTHCARESERVICEREFERRALMETHOD: [],
  RELATEDPERSONPATIENTRELATIONSHIPTYPES: [],
  HEALTHCARESERVICESPECIALITY: [],
  HEALTHCARESERVICESTATUS: [],
  PUBLICATION_STATUS: [],
  DEFINITION_TOPIC: [],
  RESOURCE_TYPE: [],
  ACTION_PARTICIPANT_TYPE: [],
  ACTION_PARTICIPANT_ROLE: [],
  // Task Resource Lookups - Start
  TASK_STATUS: [],
  REQUEST_INTENT: [],
  REQUEST_PRIORITY: [],
  TASK_PERFORMER_TYPE: [],
  // Task Resource Lookups - End
});

function lookupReducer(state = initialState, action) {
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
        .set(CARETEAMREASON, fromJS((action.lookups && action.lookups.careTeamReasons) || state.get(CARETEAMREASON)))
        .set(HEALTHCARESERVICECATEGORY, fromJS((action.lookups && action.lookups.healthcareServiceCategories) || state.get(HEALTHCARESERVICECATEGORY)))
        .set(HEALTHCARESERVICETYPE, fromJS((action.lookups && action.lookups.healthcareServiceTypes) || state.get(HEALTHCARESERVICETYPE)))
        .set(HEALTHCARESERVICEREFERRALMETHOD, fromJS((action.lookups && action.lookups.healthcareServiceReferralMethods) || state.get(HEALTHCARESERVICEREFERRALMETHOD)))
        .set(HEALTHCARESERVICESPECIALITY, fromJS((action.lookups && action.lookups.healthcareServiceSpecialities) || state.get(HEALTHCARESERVICESPECIALITY)))
        .set(HEALTHCARESERVICESTATUS, fromJS((action.lookups && action.lookups.healthcareServiceStatuses) || state.get(HEALTHCARESERVICESTATUS)))
        .set(PUBLICATION_STATUS, fromJS((action.lookups && action.lookups.publicationStatus) || state.get(PUBLICATION_STATUS)))
        .set(DEFINITION_TOPIC, fromJS((action.lookups && action.lookups.definitionTopic) || state.get(DEFINITION_TOPIC)))
        .set(RESOURCE_TYPE, fromJS((action.lookups && action.lookups.resourceType) || state.get(RESOURCE_TYPE)))
        .set(ACTION_PARTICIPANT_TYPE, fromJS((action.lookups && action.lookups.actionParticipantType) || state.get(ACTION_PARTICIPANT_TYPE)))
        .set(ACTION_PARTICIPANT_ROLE, fromJS((action.lookups && action.lookups.actionParticipantRole) || state.get(ACTION_PARTICIPANT_ROLE)))
        .set(RELATEDPERSONPATIENTRELATIONSHIPTYPES, fromJS((action.lookups && action.lookups.relatedPersonPatientRelationshipTypes) || state.get(RELATEDPERSONPATIENTRELATIONSHIPTYPES)))
        // Task Resource Lookups - Start
        .set(TASK_STATUS, fromJS((action.lookups && action.lookups.taskStatus) || state.get(TASK_STATUS)))
        .set(REQUEST_INTENT, fromJS((action.lookups && action.lookups.requestIntent) || state.get(REQUEST_INTENT)))
        .set(REQUEST_PRIORITY, fromJS((action.lookups && action.lookups.requestPriority) || state.get(REQUEST_PRIORITY)))
        .set(TASK_PERFORMER_TYPE, fromJS((action.lookups && action.lookups.taskPerformerType) || state.get(TASK_PERFORMER_TYPE)))
        // Task Resource Lookups - End
        .set('loading', false);
    case GET_LOOKUPS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default lookupReducer;
