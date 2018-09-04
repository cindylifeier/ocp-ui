import isEmpty from 'lodash/isEmpty';

export function mapToPatientUaaAssignment(patient) {
  const { organization } = patient;
  if (isEmpty(patient.uaaId)) {
    return `${organization.display}/Unassigned`;
  }
  return `${organization.display}/Assigned`;
}

export function defineTableColumns(isExpanded, manageUserEnabled) {
  const defaultExpandedTableColumns = '.3fr .5fr repeat(3, 1fr) .5fr .5fr .5fr .5fr .8fr';
  const summarizedTableColumns = '.3fr .5fr 1fr .6fr .5fr';
  const manageUserTableColumns = '.3fr .5fr repeat(4, 1fr) .5fr .5fr .5fr .5fr .8fr';
  let tableColumns = summarizedTableColumns;
  if (isExpanded && manageUserEnabled) {
    tableColumns = manageUserTableColumns;
  } else if (isExpanded) {
    tableColumns = defaultExpandedTableColumns;
  }

  return tableColumns;
}
