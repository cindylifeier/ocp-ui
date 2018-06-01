export function flattenConsentData(consent) {
  return {
    ...consent,
    fromActor: mapToConsentActors(consent.fromOrganizationActors, consent.fromPractitionerActors),
    toActor: mapToConsentActors(consent.toOrganizationActors, consent.toPractitionerActors),
    period: mapToPeriod(consent.period),
  };
}

const NEW_LINE_CHARACTER = '\n';

function mapToConsentActors(organizationActors, practitionercActors) {
  return (
    (organizationActors && organizationActors.length > 0 && organizationActors
    .map((actor) => `- ${actor.display}`)
    .join(NEW_LINE_CHARACTER)) ||
    (practitionercActors && practitionercActors.length > 0 && practitionercActors
    .map((actor) => `- ${actor.display}`)
    .join(NEW_LINE_CHARACTER))
  );
}

function mapToPeriod(period) {
  return period && `${period.start} - ${period.end}`;
}
