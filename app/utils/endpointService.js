import isUndefined from 'lodash/isUndefined';
import some from 'lodash/some';
import includes from 'lodash/includes';

// Todo: Make server side configurable
const BASE_API_URL = '/ocp-ui-api';
/**
 *  Constants to hold the external UI Api endpoint Keys
 * @type {string}
 */
export const LOGIN_API_URL = 'ocpui/utils/LOGIN_API_URL';
export const LOOKUPS_API_URL = 'ocpui/utils/LOOKUPS_API_URL';
export const BASE_CARE_TEAMS_API_URL = 'ocpui/utils/BASE_CARE_TEAMS_API_URL';
export const BASE_ORGANIZATION_API_URL = 'ocpui/utils/BASE_ORGANIZATION_API_URL';
export const BASE_ORGANIZATIONS_API_URL = 'ocpui/utils/BASE_ORGANIZATIONS_API_URL';
export const BASE_HEALTHCARE_SERVICES_API_URL = 'ocpui/utils/BASE_HEALTHCARE_SERVICES_API_URL';
export const BASE_LOCATION_API_URL = 'ocpui/utils/BASE_LOCATION_API_URL';
export const BASE_LOCATIONS_API_URL = 'ocpui/utils/BASE_LOCATIONS_API_URL';
export const BASE_PARTICIPANTS_API_URL = 'ocpui/utils/BASE_PARTICIPANTS_API_URL';
export const BASE_PATIENTS_API_URL = 'ocpui/utils/BASE_PATIENTS_API_URL';
export const BASE_PRACTITIONERS_API_URL = 'ocpui/utils/BASE_PRACTITIONERS_API_URL';
export const BASE_RELATED_PERSONS_API_URL = 'ocpui/utils/BASE_RELATED_PERSONS_API_URL';
export const BASE_TASKS_API_URL = 'ocpui/utils/BASE_TASKS_API_URL';
export const BASE_EPISODE_OF_CARES_API_URL = 'ocpui/utils/BASE_EPISODE_OF_CARES_API_URL';
/**
 * Configure all secured and unsecured endpoints
 * isSecured property is used to specify secured or unsecured endpoint. By default isSecured property will set true if it is missing to set
 * @type {*[]}
 */
const apiEndpoints = [
  { key: LOGIN_API_URL, url: `${BASE_API_URL}/login`, isSecured: false },
  { key: LOOKUPS_API_URL, url: `${BASE_API_URL}/ocp-fis/lookups`, isSecured: false },

  { key: BASE_CARE_TEAMS_API_URL, url: `${BASE_API_URL}/ocp-fis/care-teams` },
  { key: BASE_ORGANIZATION_API_URL, url: `${BASE_API_URL}/ocp-fis/organization` },
  { key: BASE_ORGANIZATIONS_API_URL, url: `${BASE_API_URL}/ocp-fis/organizations` },
  { key: BASE_HEALTHCARE_SERVICES_API_URL, url: `${BASE_API_URL}/ocp-fis/healthcare-services` },
  { key: BASE_LOCATION_API_URL, url: `${BASE_API_URL}/ocp-fis/location` },
  { key: BASE_LOCATIONS_API_URL, url: `${BASE_API_URL}/ocp-fis/locations` },
  { key: BASE_PARTICIPANTS_API_URL, url: `${BASE_API_URL}/ocp-fis/participants` },
  { key: BASE_PATIENTS_API_URL, url: `${BASE_API_URL}/ocp-fis/patients` },
  { key: BASE_PRACTITIONERS_API_URL, url: `${BASE_API_URL}/ocp-fis/practitioners` },
  { key: BASE_RELATED_PERSONS_API_URL, url: `${BASE_API_URL}/ocp-fis/related-persons` },
  { key: BASE_TASKS_API_URL, url: `${BASE_API_URL}/ocp-fis/tasks` },
  { key: BASE_EPISODE_OF_CARES_API_URL, url: `${BASE_API_URL}/ocp-fis/episode-of-cares` },
];

export function getEndpoint(key) {
  const endpoints = collectEndpoints();
  const requestEndpoint = endpoints.get(key);
  if (isUndefined(requestEndpoint)) {
    throw Error(`No ${key} endpoint configured.`);
  }
  return requestEndpoint.url;
}

/**
 *  Check the endpoint whether secured
 * @param endpoint
 * @returns {boolean}
 */
export function isSecuredEndpoint(endpoint) {
  let isEndpointSecured = true;
  const endpoints = Array.from(collectEndpoints().values());

  // Collect all unsecured endpoints
  const unsecuredEndpoints = endpoints
    .filter((ep) => ep.isSecured === false)
    .map((ep) => ep.url);
  if (some(unsecuredEndpoints, (unsecuredEndpoint) => includes(endpoint, unsecuredEndpoint))) {
    isEndpointSecured = false;
  }

  return isEndpointSecured;
}

/**
 * Collect all endpoints
 * @returns {*}
 */
function collectEndpoints() {
  const endpoints = new Map();
  apiEndpoints
    .map((endpoint) => endpoints.set(endpoint.key, endpoint));
  return endpoints;
}

