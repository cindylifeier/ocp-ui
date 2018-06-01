import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import Util from 'utils/Util';
import { CARE_COORDINATOR_ROLE_CODE } from 'containers/App/constants';
import { SHARE_ALL } from 'components/SelectMedicalInformation/constants';

export function isCareCoordinator(roleCode) {
  return isEqual(roleCode, CARE_COORDINATOR_ROLE_CODE);
}

export function mapResourceName(nameArray) {
  let name = {};
  if (nameArray.length > 0) {
    const fName = nameArray[0];
    const firstName = Util.setEmptyStringWhenUndefined(fName.firstName);
    const lastName = Util.setEmptyStringWhenUndefined(fName.lastName);
    name = `${firstName}-${lastName}`;
  }
  return name;
}

export function initialConsentFormValues(consent, careCoordinatorContext, securityLabels) {
  let formData = null;
  if (isEmpty(consent)) {
    const consentStart = new Date();
    const consentEnd = new Date();
    consentEnd.setFullYear(consentEnd.getFullYear() + 1);
    const purpose = [{
      code: 'TREAT',
      display: 'treatment',
    }];
    if (!isEmpty(careCoordinatorContext)) {
      const practitionerReference = {
        reference: {
          logicalId: careCoordinatorContext.logicalId,
          type: 'Practitioner',
        },
        display: careCoordinatorContext.name,
        identifiers: careCoordinatorContext.identifiers,
      };
      const orgReference = {
        reference: {
          logicalId: careCoordinatorContext.organization.logicalId,
          type: 'Organization',
        },
        display: careCoordinatorContext.organization.name,
        identifiers: careCoordinatorContext.organization.identifiers,
      };
      const fromActor = [orgReference, practitionerReference];
      formData = {
        consentType: false,
        consentStart,
        consentEnd,
        purpose,
        consentFromActors: fromActor,
      };
    } else {
      formData = {
        consentType: false,
        consentStart,
        consentEnd,
        purpose,
        shareType: SHARE_ALL,
        medicalInformation: securityLabels,
      };
    }
  } else {
    const consentStart = Util.setEmptyStringWhenUndefined(consent.period.start);
    const consentEnd = Util.setEmptyStringWhenUndefined(consent.period.end);
    if (consent.generalDesignation) {
      formData = {
        consentType: true,
        shareType: SHARE_ALL,
        medicalInformation: securityLabels,
        consentStart: consentStart && new Date(consentStart),
        consentEnd: consentEnd && new Date(consentEnd),
        purpose: consent.purpose,
      };
    } else {
      const fromActor = consent.fromActor.map(
        (actor) => ({
          reference: {
            logicalId: actor.reference.split('/')[1],
            type: actor.reference.split('/')[0],
          },
          display: actor.display,
          identifiers: [],
        })
      );
      const toActor = consent.toActor.map(
        (actor) => ({
          reference: {
            logicalId: actor.reference.split('/')[1],
            type: actor.reference.split('/')[0],
          },
          display: actor.display,
          identifiers: [],
        })
      );

      formData = {
        consentType: false,
        shareType: consent.consentMedicalInfoType,
        medicalInformation: consent.medicalInformation,
        consentStart: consentStart && new Date(consentStart),
        consentEnd: consentEnd && new Date(consentEnd),
        purpose: consent.purpose,
        consentFromActors: fromActor,
        consentToActors: toActor,
      };
    }
  }

  return formData;
}
