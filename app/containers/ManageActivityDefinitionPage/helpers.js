import isEmpty from 'lodash/isEmpty';
import Util from 'utils/Util';

export function initialActivityDefinitionFormValues(activityDefinition) {
  let formData = null;
  if (!isEmpty(activityDefinition)) {
    const {
      version,
      name,
      title,
      status,
      description,
      effectivePeriod,
      topic,
      relatedArtifact,
      kind,
      timing,
      actionParticipantType,
      actionParticipantRole,
    } = activityDefinition;

    formData = {
      version,
      name,
      title,
      status,
      description,
      effectiveStart: effectivePeriod && effectivePeriod.start,
      effectiveEnd: effectivePeriod && effectivePeriod.end,
      topic,
      relatedArtifact,
      kind,
      duration: timing && timing.durationMax,
      frequency: timing && timing.frequency,
      participantType: actionParticipantType,
      participantRole: actionParticipantRole,
    };
  }
  return Util.pickByIdentity(formData);
}
