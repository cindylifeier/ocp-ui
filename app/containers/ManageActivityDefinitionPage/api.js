import request from '../../utils/request';
import getApiBaseUrl from '../../apiBaseUrlConfig';

const apiBaseUrl = getApiBaseUrl();

export function createActivityDefinition(activityDefinitionFormData, organizationId) {
  const url = `${apiBaseUrl}/organization/${organizationId}/activity-definitions`;
  return request(url, {
    method: 'POST',
    body: JSON.stringify(mapToBffActivityDefinition(activityDefinitionFormData)),
    headers: {
      'Content-Type': 'application/json',
    },

  });
}

function mapToBffActivityDefinition(activityDefinitionFormData) {
  const {
    version, name, title, effectiveStart, effectiveEnd, duration, frequency, status, topic, kind, participantType, participantRole,
  } = activityDefinitionFormData;
  const effectivePeriod = {
    start: effectiveStart,
    end: effectiveEnd,
  };
  const timing = {
    durationMax: duration,
    frequency,
  };
  return { version, name, title, effectivePeriod, timing, status, topic, kind, actionParticipantType: participantType, actionParticipantRole: participantRole };
}
