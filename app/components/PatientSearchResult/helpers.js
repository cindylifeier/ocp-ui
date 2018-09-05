import isEmpty from 'lodash/isEmpty';

export function mapToPatientUaaAssignment(patient) {
  const { organization } = patient;
  if (isEmpty(patient.uaaId)) {
    return `${organization.display}/Unassigned`;
  }
  return `${organization.display}/Assigned`;
}

export function defineTableColumns(isExpanded, manageUserEnabled) {
  const defaultExpandedTableColumns = '.3fr .6fr repeat(3, 1fr) .5fr .5fr .5fr .5fr .8fr';
  const defaultSummarizedTableColumns = '.3fr .6fr 1fr .6fr .5fr';
  const manageUserTableColumns = '.3fr .6fr repeat(4, 1fr) .5fr .5fr .5fr .5fr .8fr';
  const manageUserSummarizedTableColumns = '.3fr .6fr repeat(2, 1fr).5fr 0.5fr';
  let tableColumns = defaultSummarizedTableColumns;
  if (isExpanded && manageUserEnabled) {
    tableColumns = manageUserTableColumns;
  } else if (manageUserEnabled) {
    tableColumns = manageUserSummarizedTableColumns;
  } else if (isExpanded) {
    tableColumns = defaultExpandedTableColumns;
  }
  return tableColumns;
}
