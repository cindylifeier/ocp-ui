export function flattenConsentData(consent) {
  return {
    ...consent,
    fromActor: mapToActors(consent.fromActor),
    toActor: mapToActors(consent.toActor),
    period: mapToPeriod(consent.period),
  };
}

const NEW_LINE_CHARACTER = '\n';

function mapToActors(actors) {
  return actors && actors
    .map((actor) => `- ${actor.display}`)
    .join(NEW_LINE_CHARACTER);
}

function mapToPeriod(period) {
  return period && `${period.start} - ${period.end}`;
}
