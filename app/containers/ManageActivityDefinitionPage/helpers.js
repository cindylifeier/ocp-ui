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
      status: status.code,
      description,
      effectiveStart: effectivePeriod && new Date(effectivePeriod.start),
      effectiveEnd: effectivePeriod && new Date(effectivePeriod.end),
      topic: topic.code,
      relatedArtifact,
      kind: kind.code,
      duration: timing && timing.durationMax.toString(),
      frequency: timing && timing.frequency.toString(),
      participantType: actionParticipantType.code,
      participantRole: actionParticipantRole.code,
    };
  }
  return Util.pickByIdentity(formData);
}
