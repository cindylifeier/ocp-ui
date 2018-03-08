import { createSelector } from 'reselect';
import {
  ACTION_PARTICIPANT_ROLE,
  ACTION_PARTICIPANT_TYPE,
  ADDRESSUSE,
  ADMINISTRATIVEGENDER,
  APPOINTMENT_PARTICIPANT_REQUIRED,
  APPOINTMENT_PARTICIPATION_STATUS,
  APPOINTMENT_PARTICIPATION_TYPE,
  APPOINTMENT_STATUS,
  APPOINTMENT_TYPE,
  CARETEAMCATEGORY,
  CARETEAMREASON,
  CARETEAMSTATUS,
  DEFINITION_TOPIC,
  GLOBAL_LOOKUP_STATE_KEY,
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
  RELATED_ARTIFACT_TYPE,
  RELATEDPERSONPATIENTRELATIONSHIPTYPES,
  REQUEST_INTENT,
  REQUEST_PRIORITY,
  RESOURCE_TYPE,
  TASK_PERFORMER_TYPE,
  TASK_STATUS,
  TELECOMSYSTEM,
  TELECOMUSE,
  USCOREBIRTHSEX,
  USCOREETHNICITY,
  USCORERACE,
  USPSSTATES,
} from './constants';
import selectGlobalDomain from './selectors';

const makeSelectUspsStates = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(USPSSTATES).toJS(),
);

const makeSelectLocationPhysicalTypes = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(LOCATIONPHYSICALTYPE).toJS(),
);

const makeSelectLocationStatuses = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(LOCATIONSTATUS).toJS(),
);

const makeSelectAddressUses = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(ADDRESSUSE).toJS(),
);

const makeSelectLocationIdentifierSystems = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(LOCATIONIDENTIFIERSYSTEM).toJS(),
);

const makeSelectPractitionerIdentifierSystems = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(PRACTITIONERIDENTIFIERSYSTEM).toJS(),
);

const makeSelectOrganizationIdentifierSystems = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(ORGANIZATIONIDENTIFIERSYSTEM).toJS(),
);

const makeSelectOrganizationStatuses = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(ORGANIZATIONSTATUS).toJS(),
);

const makeSelectCareTeamCategories = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(CARETEAMCATEGORY).toJS(),
);

const makeSelectCareTeamReasons = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(CARETEAMREASON).toJS(),
);

const makeSelectParticipantTypes = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(PARTICIPANTTYPE).toJS(),
);

const makeSelectParticipantRoles = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(PARTICIPANTROLE).toJS(),
);

const makeSelectCareTeamStatuses = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(CARETEAMSTATUS).toJS(),
);

const makeSelectTelecomSystems = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(TELECOMSYSTEM).toJS(),
);

const makeSelectTelecomUses = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(TELECOMUSE).toJS(),
);

const makeSelectPractitionerRoles = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(PRACTITIONERROLES).toJS(),
);

const makeSelectLookups = (name) => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(name).toJS(),
);

const makeSelectPatientIdentifierSystems = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(PATIENTIDENTIFIERSYSTEM).toJS(),
);

const makeSelectAdministrativeGenders = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(ADMINISTRATIVEGENDER).toJS(),
);

const makeSelectUsCoreRaces = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(USCORERACE).toJS(),
);

const makeSelectUsCoreEthnicities = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(USCOREETHNICITY).toJS(),
);

const makeSelectUsCoreBirthSexes = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(USCOREBIRTHSEX).toJS(),
);

const makeSelectLanguages = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(LANGUAGE).toJS(),
);

const makeSelectHealthcareServiceCategories = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(HEALTHCARESERVICECATEGORY).toJS(),
);

const makeSelectHealthcareServiceTypes = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(HEALTHCARESERVICETYPE).toJS(),
);

const makeSelectHealthcareServiceReferralMethods = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(HEALTHCARESERVICEREFERRALMETHOD).toJS(),
);

const makeSelectHealthcareServiceSpecialities = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(HEALTHCARESERVICESPECIALITY).toJS(),
);

const makeSelectHealthcareServiceStatuses = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(HEALTHCARESERVICESTATUS).toJS(),
);

const makeSelectPublicationStatuses = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(PUBLICATION_STATUS).toJS(),
);

const makeSelectDefinitionTopics = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(DEFINITION_TOPIC).toJS(),
);

const makeSelectResourceTypes = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(RESOURCE_TYPE).toJS(),
);

const makeSelectActionParticipantTypes = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(ACTION_PARTICIPANT_TYPE).toJS(),
);

const makeSelectActionParticipantRoles = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(ACTION_PARTICIPANT_ROLE).toJS(),
);

const makeSelectRelatedPersonPatientRelationshipTypes = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(RELATEDPERSONPATIENTRELATIONSHIPTYPES).toJS(),
);
// Task Resource Lookups - Start
const makeSelectTaskStatuses = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(TASK_STATUS).toJS(),
);

const makeSelectRequestIntents = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(REQUEST_INTENT).toJS(),
);

const makeSelectRequestPriorities = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(REQUEST_PRIORITY).toJS(),
);

const makeSelectTaskPerformerTypes = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(TASK_PERFORMER_TYPE).toJS(),
);

const makeSelectRelatedArtifactTypes = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(RELATED_ARTIFACT_TYPE).toJS(),
);

const makeSelectAppointmentStatuses = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(APPOINTMENT_STATUS).toJS(),
);

const makeSelectAppointmentTypes = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(APPOINTMENT_TYPE).toJS(),
);

const makeSelectAppointmentParticipationStatuses = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(APPOINTMENT_PARTICIPATION_STATUS).toJS(),
);

const makeSelectAppointmentParticipationTypes = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(APPOINTMENT_PARTICIPATION_TYPE).toJS(),
);

const makeSelectAppointmentParticipationRequired = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_LOOKUP_STATE_KEY).get(APPOINTMENT_PARTICIPANT_REQUIRED).toJS(),
);

// Task Resource Lookups - End
export {
  makeSelectUspsStates,
  makeSelectLocationPhysicalTypes,
  makeSelectLocationStatuses,
  makeSelectAddressUses,
  makeSelectLocationIdentifierSystems,
  makeSelectOrganizationIdentifierSystems,
  makeSelectOrganizationStatuses,
  makeSelectPractitionerIdentifierSystems,
  makeSelectTelecomUses,
  makeSelectTelecomSystems,
  makeSelectPractitionerRoles,
  makeSelectLookups,
  makeSelectPatientIdentifierSystems,
  makeSelectAdministrativeGenders,
  makeSelectUsCoreRaces,
  makeSelectUsCoreEthnicities,
  makeSelectUsCoreBirthSexes,
  makeSelectLanguages,
  makeSelectCareTeamCategories,
  makeSelectParticipantTypes,
  makeSelectParticipantRoles,
  makeSelectCareTeamStatuses,
  makeSelectCareTeamReasons,
  makeSelectHealthcareServiceCategories,
  makeSelectHealthcareServiceTypes,
  makeSelectHealthcareServiceReferralMethods,
  makeSelectHealthcareServiceSpecialities,
  makeSelectHealthcareServiceStatuses,
  makeSelectPublicationStatuses,
  makeSelectDefinitionTopics,
  makeSelectResourceTypes,
  makeSelectActionParticipantTypes,
  makeSelectActionParticipantRoles,
  makeSelectRelatedPersonPatientRelationshipTypes,
  makeSelectTaskStatuses,
  makeSelectRequestIntents,
  makeSelectRequestPriorities,
  makeSelectTaskPerformerTypes,
  makeSelectRelatedArtifactTypes,
  makeSelectAppointmentStatuses,
  makeSelectAppointmentTypes,
  makeSelectAppointmentParticipationStatuses,
  makeSelectAppointmentParticipationTypes,
  makeSelectAppointmentParticipationRequired,
};

