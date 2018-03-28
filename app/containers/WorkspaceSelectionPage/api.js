import request from 'utils/request';
import { BASE_ORGANIZATIONS_API_URL, BASE_PRACTITIONERS_API_URL, getEndpoint } from 'utils/endpointService';
import queryString from 'utils/queryString';
import {
  CARE_COORDINATOR_ROLE_VALUE,
  CARE_MANAGER_ROLE_VALUE,
  OCP_ADMIN_ROLE_VALUE,
  PATIENT_ROLE_VALUE,
} from 'containers/App/constants';

export function getActiveOrganizations() {
  const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);
  // Todo: Change list organization endpoint
  const showInactive = false;
  const params = queryString({ showInactive });
  const requestURL = `${baseEndpoint}/all${params}`;
  return request(requestURL);
}

// Todo: will get data from backend
export function getWorkflowRoles() {
  return {
    ocpAdminWorkflowRole: {
      value: OCP_ADMIN_ROLE_VALUE,
      display: 'OCP Admin',
    },
    careManagerWorkflowRole: {
      value: CARE_MANAGER_ROLE_VALUE,
      display: 'Care Manager/Organization Admin',
    },
    careCoordinatorWorkflowRole: {
      value: CARE_COORDINATOR_ROLE_VALUE,
      display: 'Care Coordinator/PCP',
    },
    patientWorkflowRole: {
      value: PATIENT_ROLE_VALUE,
      display: 'Patient',
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

