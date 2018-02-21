import isUndefined from 'lodash/isUndefined';
import some from 'lodash/some';
import includes from 'lodash/includes';

import getApiBaseUrl from '../apiBaseUrlConfig';

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
  { key: LOGIN_API_URL, url: combineBaseApiUrl('login'), isSecured: false },
  { key: LOOKUPS_API_URL, url: combineBaseApiUrl('ocp-fis/lookups'), isSecured: false },

  { key: BASE_CARE_TEAMS_API_URL, url: combineBaseApiUrl('ocp-fis/care-teams'), isSecured: true },
  { key: BASE_ORGANIZATION_API_URL, url: combineBaseApiUrl('ocp-fis/organization'), isSecured: true },
  { key: BASE_ORGANIZATIONS_API_URL, url: combineBaseApiUrl('ocp-fis/organizations'), isSecured: true },
  { key: BASE_HEALTHCARE_SERVICES_API_URL, url: combineBaseApiUrl('ocp-fis/healthcare-services'), isSecured: true },
  { key: BASE_LOCATION_API_URL, url: combineBaseApiUrl('ocp-fis/location'), isSecured: true },
  { key: BASE_LOCATIONS_API_URL, url: combineBaseApiUrl('ocp-fis/locations'), isSecured: true },
  { key: BASE_PARTICIPANTS_API_URL, url: combineBaseApiUrl('ocp-fis/participants'), isSecured: true },
  { key: BASE_PATIENTS_API_URL, url: combineBaseApiUrl('ocp-fis/patients'), isSecured: true },
  { key: BASE_PRACTITIONERS_API_URL, url: combineBaseApiUrl('ocp-fis/practitioners'), isSecured: true },
  { key: BASE_RELATED_PERSONS_API_URL, url: combineBaseApiUrl('ocp-fis/related-persons'), isSecured: true },
];

export function getEndpoint(key) {
  const securedEndpoints = configureSecuredEndpoints();
  const unSecuredEndpoints = configureUnSecuredEndpoints();
  const endpoints = new Map([...securedEndpoints, ...unSecuredEndpoints]);
  const requestEndpoint = endpoints.get(key);
  if (isUndefined(requestEndpoint)) {
    throw Error(`No ${key} endpoint configured.`);
  }
  return requestEndpoint;
}

/**
 *  Check the endpoint whether secured
 * @param endpoint
 * @returns {boolean}
 */
export function isSecuredEndpoint(endpoint) {
  let isEndpointSecured = false;

  const securedEndpoints = Array.from(configureSecuredEndpoints().values());
  if (some(securedEndpoints, (securedEndpoint) => includes(endpoint, securedEndpoint))) {
    isEndpointSecured = true;
  }

  return isEndpointSecured;
}

/**
 * Collect all unsecured endpoints
 * @returns {*}
 */
export function configureUnSecuredEndpoints() {
  const unSecuredEndpoints = new Map();
  apiEndpoints
    .filter((endpoint) => endpoint.isSecured === false)
    .map((endpoint) => unSecuredEndpoints.set(endpoint.key, endpoint.url));
  return unSecuredEndpoints;
}

/**
 * Collect all secured endpoints
 * @returns {Map<any, any>}
 */
export function configureSecuredEndpoints() {
  const securedEndpoints = new Map();
  apiEndpoints
    .filter((endpoint) => endpoint.isSecured === true)
    .map((endpoint) => securedEndpoints.set(endpoint.key, endpoint.url));
  return securedEndpoints;
}

function combineBaseApiUrl(endpoint) {
  const baseApiUrl = getApiBaseUrl();
  return `${baseApiUrl}/${endpoint}`;
}
