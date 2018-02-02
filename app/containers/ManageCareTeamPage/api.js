import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import request from '../../utils/request';
import getApiBaseUrl from '../../apiBaseUrlConfig';

const apiBaseURL = getApiBaseUrl();

export function getPatientById(patients, patientId) {
  if (!isEmpty(patients)) {
    return find(patients, { id: patientId });
  }
  return null;
}

export function createCareTeam(careTeamFormData) {
  const requestURL = `${apiBaseURL}/careteams`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(mapToBffCareTeam(careTeamFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function mapToBffCareTeam(careTeamData) {
  const {
    careTeamName, category, patientId, status, startDate, endDate,
  } = careTeamData;

  // Todo: Replace with formData later
  const participants = [{
    roleCode: '112247003',
    memberId: '700551',
    memberFirstName: 'Participant',
    memberLastName: 'Test',
    memberType: 'practitioner',
  }];

  return {
    name: careTeamName,
    statusCode: status,
    categoryCode: category,
    subjectId: patientId,
    startDate: startDate.toLocaleDateString(),
    endDate: endDate.toLocaleDateString(),
    participants,
  };
}
