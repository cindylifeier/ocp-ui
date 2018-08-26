export function mapToOrganizationName(practitionerRoles) {
  return practitionerRoles && practitionerRoles
    .map((role) => role.organization)
    .map((organization) => organization.display)
    .pop();
}
