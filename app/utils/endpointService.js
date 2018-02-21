import isUndefined from 'lodash/isUndefined';
import some from 'lodash/some';
import includes from 'lodash/includes';

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

/**
 * Configure all secured and unsecured endpoints
 * @type {*[]}
 */
const apiEndpoints = [
  { key: LOGIN_API_URL, url: '/ocp-ui-api/login', isSecured: false },
  { key: LOOKUPS_API_URL, url: '/ocp-ui-api/ocp-fis/lookups', isSecured: false },

  { key: BASE_CARE_TEAMS_API_URL, url: '/ocp-ui-api/ocp-fis/care-teams', isSecured: true },
  { key: BASE_ORGANIZATION_API_URL, url: '/ocp-ui-api/ocp-fis/organization', isSecured: true },
  { key: BASE_ORGANIZATIONS_API_URL, url: '/ocp-ui-api/ocp-fis/organizations', isSecured: true },
  { key: BASE_HEALTHCARE_SERVICES_API_URL, url: '/ocp-ui-api/ocp-fis/healthcare-services', isSecured: true },
  { key: BASE_LOCATION_API_URL, url: '/ocp-ui-api/ocp-fis/location', isSecured: true },
  { key: BASE_LOCATIONS_API_URL, url: '/ocp-ui-api/ocp-fis/locations', isSecured: true },
  { key: BASE_PARTICIPANTS_API_URL, url: '/ocp-ui-api/ocp-fis/participants', isSecured: true },
  { key: BASE_PATIENTS_API_URL, url: '/ocp-ui-api/ocp-fis/patients', isSecured: true },
  { key: BASE_PRACTITIONERS_API_URL, url: '/ocp-ui-api/ocp-fis/practitioners', isSecured: true },
  { key: BASE_RELATED_PERSONS_API_URL, url: '/ocp-ui-api/ocp-fis/related-persons', isSecured: true },
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
  let isEndpointSecured = false;
  const endpoints = Array.from(collectEndpoints().values());

  // Collect all secured endpoints
  const securedEndpoints = endpoints
    .filter((ep) => ep.isSecured === true)
    .map((ep) => ep.url);
  if (some(securedEndpoints, (securedEndpoint) => includes(endpoint, securedEndpoint))) {
    isEndpointSecured = true;
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

