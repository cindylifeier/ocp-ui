import isUndefined from 'lodash/isUndefined';
import some from 'lodash/some';
import includes from 'lodash/includes';

import getApiBaseUrl from '../apiBaseUrlConfig';

/**
 *  Constants to hold the external UI Api endpoints
 * @type {string}
 */
export const LOGIN_API_URL = combineBaseApiUrl('login');
export const LOOKUPS_API_URL = combineBaseApiUrl('ocp-fis/lookups');
export const BASE_CARE_TEAMS_API_URL = combineBaseApiUrl('ocp-fis/care-teams');
export const BASE_ORGANIZATION_API_URL = combineBaseApiUrl('ocp-fis/organization');
export const BASE_ORGANIZATIONS_API_URL = combineBaseApiUrl('ocp-fis/organizations');
export const BASE_HEALTHCARE_SERVICES_API_URL = combineBaseApiUrl('ocp-fis/healthcare-services');
export const BASE_LOCATION_API_URL = combineBaseApiUrl('ocp-fis/location');
export const BASE_LOCATIONS_API_URL = combineBaseApiUrl('ocp-fis/locations');
export const BASE_PARTICIPANTS_API_URL = combineBaseApiUrl('ocp-fis/participants');
export const BASE_PATIENTS_API_URL = combineBaseApiUrl('ocp-fis/patients');
export const BASE_PRACTITIONERS_API_URL = combineBaseApiUrl('ocp-fis/practitioners');
export const BASE_RELATED_PERSONS_API_URL = combineBaseApiUrl('ocp-fis/related-persons');

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
 * Configure all unsecured endpoints
 * @returns {*}
 */
function configureUnSecuredEndpoints() {
  const unSecuredEndpoints = new Map();
  unSecuredEndpoints.set(LOGIN_API_URL, LOGIN_API_URL);
  unSecuredEndpoints.set(LOOKUPS_API_URL, LOOKUPS_API_URL);
  return unSecuredEndpoints;
}

/**
 * Configure all secured endpoints
 * @returns {Map<any, any>}
 */
function configureSecuredEndpoints() {
  const securedEndpoints = new Map();
  securedEndpoints.set(BASE_CARE_TEAMS_API_URL, BASE_CARE_TEAMS_API_URL);
  securedEndpoints.set(BASE_LOCATION_API_URL, BASE_LOCATION_API_URL);
  securedEndpoints.set(BASE_LOCATIONS_API_URL, BASE_LOCATIONS_API_URL);
  securedEndpoints.set(BASE_PATIENTS_API_URL, BASE_PATIENTS_API_URL);
  securedEndpoints.set(BASE_ORGANIZATION_API_URL, BASE_ORGANIZATION_API_URL);
  securedEndpoints.set(BASE_ORGANIZATIONS_API_URL, BASE_ORGANIZATIONS_API_URL);
  securedEndpoints.set(BASE_PARTICIPANTS_API_URL, BASE_PARTICIPANTS_API_URL);
  securedEndpoints.set(BASE_PRACTITIONERS_API_URL, BASE_PRACTITIONERS_API_URL);
  securedEndpoints.set(BASE_RELATED_PERSONS_API_URL, BASE_RELATED_PERSONS_API_URL);
  securedEndpoints.set(BASE_HEALTHCARE_SERVICES_API_URL, BASE_HEALTHCARE_SERVICES_API_URL);
  return securedEndpoints;
}

function combineBaseApiUrl(endpoint) {
  const baseApiUrl = getApiBaseUrl();
  return `${baseApiUrl}/${endpoint}`;
}
