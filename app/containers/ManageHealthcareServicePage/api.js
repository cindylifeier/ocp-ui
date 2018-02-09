import request from '../../utils/request';
import getApiBaseUrl from '../../apiBaseUrlConfig';

const apiBaseUrl = getApiBaseUrl();

export function createHealthcareService(healthcareServiceFormData, organizationId) {
  const url = `${apiBaseUrl}/organization/${organizationId}/healthcare-service`;
  return request(url, {
    method: 'POST',
    body: JSON.stringify(mapToBffHealthcareService(healthcareServiceFormData)),
    headers: {
      'Content-Type': 'application/json',
    },

  });
}

function mapToBffHealthcareService(healthcareServiceFormData) {
  const {
    name, hcsProgramName, category, hcsType, hcsSpecialty, telecomType, hcsReferralMethod, telecomValue,
  } = healthcareServiceFormData;
  const programName = [];
  programName.push(hcsProgramName);
  const type = [];
  type.push(hcsType);
  const specialty = [];
  specialty.push(hcsSpecialty);
  const referralMethod = [];
  referralMethod.push(hcsReferralMethod);
  const telecom = [{
    system: telecomType,
    value: telecomValue,
  }];
  return { name, programName, category, type, specialty, telecom, referralMethod, active: true };
}
