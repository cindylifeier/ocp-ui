import request from 'utils/request';
import { BASE_ORGANIZATIONS_API_URL, BASE_PATIENTS_API_URL, getEndpoint } from 'utils/endpointService';
import queryString from 'utils/queryString';
import {
  ADMIN_WORKSPACE,
  CARE_COORDINATOR_ROLE_VALUE,
  CARE_MANAGER_ROLE_VALUE,
  OCP_ADMIN_ROLE_VALUE,
  PATIENT_ROLE_VALUE,
  PATIENT_WORKSPACE,
  PRACTITIONER_WORKSPACE,
  WORKSPACE_SELECTION_URL,
} from 'containers/App/constants';

export function getLinkUrlByRole(role) {
  let linkUrl;
  switch (role) {
    case OCP_ADMIN_ROLE_VALUE:
      linkUrl = ADMIN_WORKSPACE;
      break;
    case CARE_MANAGER_ROLE_VALUE:
      linkUrl = PRACTITIONER_WORKSPACE;
      break;
    case CARE_COORDINATOR_ROLE_VALUE:
      linkUrl = PRACTITIONER_WORKSPACE;
      break;
    case PATIENT_ROLE_VALUE:
      linkUrl = PATIENT_WORKSPACE;
      break;
    default:
      linkUrl = WORKSPACE_SELECTION_URL;
  }
  return linkUrl;
}

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
      value: 'ocpAdminRole',
      display: 'OCP Admin',
    },
    careManagerWorkflowRole: {
      value: 'careManagerRole',
      display: 'Care Manager',
    },
    orgAdminWorkflowRole: {
      value: 'orgAdminRole',
      display: 'Organization Admin',
    },
    careCoordinatorWorkflowRole: {
      value: 'careCoordinatorRole',
      display: 'Care Coordinator',
    },
    patientWorkflowRole: {
      value: 'patientRole',
      display: 'Patient',
    },
    pcpWorkflowRole: {
      value: 'pcpRole',
      display: 'PCP',
    },
  };
}

// Todo: will get data from backend
export function getCareManagers() {
  const careManagers = [
    {
      logicalId: '1',
      name: 'Care Manager A',
    },
    {
      logicalId: '2',
      name: 'Care Manager B',
    },
    {
      logicalId: '3',
      name: 'Care Manager C',
    },
  ];
  return {
    elements: careManagers,
  };
}

// Todo: will get data from backend
export function getCareCoordinators() {
  const careCoordinators = [
    {
      logicalId: '1',
      name: 'Care Coordinators A',
    },
    {
      logicalId: '2',
      name: 'Care Coordinators B',
    },
    {
      logicalId: '3',
      name: 'Care Coordinators C',
    },
  ];
  return {
    elements: careCoordinators,
  };
}

export function getPatients() {
  const requestURL = getEndpoint(BASE_PATIENTS_API_URL);
  return request(requestURL);
}
