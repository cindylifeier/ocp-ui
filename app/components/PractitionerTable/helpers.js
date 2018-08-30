import uniq from 'lodash/uniq';
import { NEW_LINE_CHARACTER } from 'containers/App/constants';

export function mapToOrganizationName(practitionerRoles) {
  const organizations = practitionerRoles && practitionerRoles
    .map((role) => role.organization)
    .map((organization) => organization.display);
  return uniq(organizations)
    .join(NEW_LINE_CHARACTER);
}
