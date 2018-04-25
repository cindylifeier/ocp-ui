import request from 'utils/request';
import Util from 'utils/Util';
import { BASE_ORGANIZATION_API_URL, getEndpoint } from 'utils/endpointService';


const baseEndpoint = getEndpoint(BASE_ORGANIZATION_API_URL);

export function getActivityDefinition(organizationId, activityDefinitionId) {
  const requestURL = `${baseEndpoint}/${organizationId}/activity-definitions/${activityDefinitionId}`;
  return request(requestURL);
}

export function createActivityDefinition(activityDefinitionFormData, organizationId) {
  const url = `${baseEndpoint}/${organizationId}/activity-definitions`;
  return request(url, {
    method: 'POST',
    body: JSON.stringify(mapToBffActivityDefinition(activityDefinitionFormData)),
    headers: {
      'Content-Type': 'application/json',
    },

  });
}

export function getErrorDetail(err) {
  let errorDetail = '';
  if (err && err.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (err && err.response && err.response.status === 409) {
    errorDetail = ' Duplicate Entry:: Same Category and Type already exists.';
  } else if (err && err.response && err.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}

function mapToBffActivityDefinition(activityDefinitionFormData) {
  const {
    version, name, title, description, effectiveStart, effectiveEnd, duration, frequency, status, topic, kind, participantType, participantRole, relatedArtifact,
  } = activityDefinitionFormData;
  const effectivePeriod = {
    start: Util.formatDate(effectiveStart),
    end: Util.formatDate(effectiveEnd),
  };
  const timing = {
    durationMax: duration,
    frequency,
  };
  return {
    version,
    name,
    title,
    description,
    effectivePeriod,
    timing,
    status,
    topic,
    kind,
    actionParticipantType: participantType,
    actionParticipantRole: participantRole,
    relatedArtifact,
  };
}
