import { mapToIdentifiers } from 'containers/App/helpers';

export function flattenPractitionerData(practitioners) {
  return practitioners && practitioners.map((practitioner) => ({
    ...practitioner,
    identifiers: mapToIdentifiers(practitioner.identifiers),
  }));
}
