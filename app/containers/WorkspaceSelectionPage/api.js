import request from 'utils/request';
import { BASE_PATIENTS_API_URL, BASE_PRACTITIONERS_API_URL, getEndpoint } from 'utils/endpointService';
import queryString from 'utils/queryString';
import {
  CARE_COORDINATOR_ROLE_VALUE,
  CARE_MANAGER_ROLE_VALUE,
  DEFAULT_PAGE_SIZE,
  OCP_ADMIN_ROLE_VALUE,
  ORGANIZATION_ADMIN_ROLE_VALUE,
  PATIENT_ROLE_VALUE,
  PCP_ROLE_VALUE,
} from 'containers/App/constants';


// Todo: will get data from backend
export function getWorkflowRoles() {
  return {
    ocpAdminWorkflowRole: {
      value: OCP_ADMIN_ROLE_VALUE,
      display: 'OCP Admin',
    },
    careManagerWorkflowRole: {
      value: CARE_MANAGER_ROLE_VALUE,
      display: 'Care Manager',
    },
    careCoordinatorWorkflowRole: {
      value: CARE_COORDINATOR_ROLE_VALUE,
      display: 'Care Coordinator',
    },
    orgAdminWorkflowRole: {
      value: ORGANIZATION_ADMIN_ROLE_VALUE,
      display: 'Organization Admin',
    },
    patientWorkflowRole: {
      value: PATIENT_ROLE_VALUE,
      display: 'Patient',
    },
    pcpWorkflowRole: {
      value: PCP_ROLE_VALUE,
      display: 'Primary Care Provider',
    },
  };
}

export function getCareManagers(role, organization) {
  const baseEndpoint = getEndpoint(BASE_PRACTITIONERS_API_URL);
  const params = queryString({ role });
  const requestURL = `${baseEndpoint}/organization/${organization}${params}`;
  return request(requestURL);
}

export function getCareCoordinators(role, organization) {
  const baseEndpoint = getEndpoint(BASE_PRACTITIONERS_API_URL);
  const params = queryString({ role });
  const requestURL = `${baseEndpoint}/organization/${organization}${params}`;
  return request(requestURL);
}

export function searchPatients(searchValue, showInactive, searchType, currentPage) {
  const params = queryString({
    value: searchValue,
    showInactive,
    type: searchType,
    page: currentPage,
    size: DEFAULT_PAGE_SIZE,
  });

  const baseEndpoint = getEndpoint(BASE_PATIENTS_API_URL);
  const requestURL = `${baseEndpoint}/search${params}`;
  return request(requestURL);
}

