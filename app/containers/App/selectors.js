import { createSelector } from 'reselect';
import {
  ADDRESSUSE,
  ADMINISTRATIVEGENDER,
  CARETEAMCATEGORY,
  CARETEAMREASON,
  CARETEAMSTATUS,
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
} from './constants';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS(),
);

const makeSelectUspsStates = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(USPSSTATES).toJS(),
);

const makeSelectLocationPhysicalTypes = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(LOCATIONPHYSICALTYPE).toJS(),
);

const makeSelectLocationStatuses = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(LOCATIONSTATUS).toJS(),
);

const makeSelectAddressUses = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(ADDRESSUSE).toJS(),
);

const makeSelectLocationIdentifierSystems = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(LOCATIONIDENTIFIERSYSTEM).toJS(),
);

const makeSelectPractitionerIdentifierSystems = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(PRACTITIONERIDENTIFIERSYSTEM).toJS(),
);

const makeSelectOrganizationIdentifierSystems = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(ORGANIZATIONIDENTIFIERSYSTEM).toJS(),
);

const makeSelectOrganizationStatuses = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(ORGANIZATIONSTATUS).toJS(),
);

const makeSelectCareTeamCategories = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(CARETEAMCATEGORY).toJS(),
);

const makeSelectCareTeamReasons = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(CARETEAMREASON).toJS(),
);

const makeSelectParticipantTypes = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(PARTICIPANTTYPE).toJS(),
);

const makeSelectParticipantRoles = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(PARTICIPANTROLE).toJS(),
);

const makeSelectCareTeamStatuses = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(CARETEAMSTATUS).toJS(),
);

const makeSelectTelecomSystems = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(TELECOMSYSTEM).toJS(),
);

const makeSelectTelecomUses = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(TELECOMUSE).toJS(),
);

const makeSelectPractitionerRoles = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(PRACTITIONERROLES).toJS(),
);

const makeSelectLookups = (name) => createSelector(
  selectGlobal,
  (globalState) => globalState.get(name).toJS(),
);

const makeSelectPatientIdentifierSystems = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(PATIENTIDENTIFIERSYSTEM).toJS(),
);

const makeSelectAdministrativeGenders = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(ADMINISTRATIVEGENDER).toJS(),
);

const makeSelectUsCoreRaces = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(USCORERACE).toJS(),
);

const makeSelectUsCoreEthnicities = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(USCOREETHNICITY).toJS(),
);

const makeSelectUsCoreBirthSexes = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(USCOREBIRTHSEX).toJS(),
);

const makeSelectLanguages = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(LANGUAGE).toJS(),
);


export {
  makeSelectLocation,
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
};
