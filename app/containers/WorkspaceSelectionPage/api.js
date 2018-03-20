import request from 'utils/request';
import { BASE_ORGANIZATIONS_API_URL, getEndpoint } from 'utils/endpointService';
import queryString from 'utils/queryString';

export function getActiveOrganizations() {
  const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);
  // Todo: Change list organization endpoint
  const showInactive = false;
  const params = queryString({ showInactive });
  const requestURL = `${baseEndpoint}/all${params}`;
  return request(requestURL);
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

// Todo: will get data from backend
export function getPatients() {
  const patients = [
    {
      id: '1',
      name: 'Patient A',
    },
    {
      id: '2',
      name: 'Patient B',
    },
    {
      id: '3',
      name: 'Patient C',
    },
  ];
  return {
    elements: patients,
  };
}
