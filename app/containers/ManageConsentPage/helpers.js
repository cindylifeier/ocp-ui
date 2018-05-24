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

export function initialConsentFormValues(consent, careCoordinatorContext) {
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
      };
    }
  } else {
    const consentStart = consent.period.start;
    const consentEnd = consent.period.end;
    const purpose = consent.purpose;
    formData = {
      consentType: true,
      shareType: SHARE_ALL,
      consentStart,
      consentEnd,
      purpose,
    };
  }

  return formData;
}
