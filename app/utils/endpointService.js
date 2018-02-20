import isUndefined from 'lodash/isUndefined';

import getApiBaseUrl from '../apiBaseUrlConfig';

/**
 *  Constants to hold the external UI Api endpoints
 * @type {string}
 */
export const LOGIN_API_URL = 'login';
export const LOOKUPS_API_URL = 'ocp-fis/lookups';
export const BASE_CARE_TEAMS_API_URL = 'ocp-fis/care-teams';
export const BASE_ORGANIZATION_API_URL = 'ocp-fis/organization';
export const BASE_ORGANIZATIONS_API_URL = 'ocp-fis/organizations';
export const BASE_HEALTHCARE_SERVICE_API_URL = 'ocp-fis/healthcare-services';
export const BASE_LOCATION_API_URL = 'ocp-fis/location';
export const BASE_LOCATIONS_API_URL = 'ocp-fis/locations';
export const BASE_PARTICIPANTS_API_URL = 'ocp-fis/participants';
export const BASE_PATIENTS_API_URL = 'ocp-fis/patients';
export const BASE_PRACTITIONERS_API_URL = 'ocp-fis/practitioners';
export const BASE_RELATED_PERSONS_API_URL = 'ocp-fis/related-persons';

export function getEndpoint(key) {
  const endpoints = configureEndpoints();
  const requestEndpoint = endpoints.get(key);
  if (isUndefined(requestEndpoint)) {
    throw Error(`No ${key} endpoint configured.`);
  }
  return requestEndpoint;
}

function configureEndpoints() {
  const endpoints = new Map();
  // Unsecured endpoints
  endpoints.set(LOGIN_API_URL, { url: combineBaseApiUrl(LOGIN_API_URL), isSecured: false });
  endpoints.set(LOOKUPS_API_URL, { url: combineBaseApiUrl(LOOKUPS_API_URL), isSecured: false });

  // Secured endpoints
  endpoints.set(BASE_CARE_TEAMS_API_URL, { url: combineBaseApiUrl(BASE_CARE_TEAMS_API_URL), isSecured: true });
  endpoints.set(BASE_ORGANIZATION_API_URL, { url: combineBaseApiUrl(BASE_ORGANIZATION_API_URL), isSecured: true });
  endpoints.set(BASE_ORGANIZATIONS_API_URL, { url: combineBaseApiUrl(BASE_ORGANIZATIONS_API_URL), isSecured: true });
  endpoints.set(BASE_LOCATION_API_URL, { url: combineBaseApiUrl(BASE_LOCATION_API_URL), isSecured: true });
  endpoints.set(BASE_LOCATIONS_API_URL, { url: combineBaseApiUrl(BASE_LOCATIONS_API_URL), isSecured: true });
  endpoints.set(BASE_PARTICIPANTS_API_URL, { url: combineBaseApiUrl(BASE_PARTICIPANTS_API_URL), isSecured: true });
  endpoints.set(BASE_PATIENTS_API_URL, { url: combineBaseApiUrl(BASE_PATIENTS_API_URL), isSecured: true });
  endpoints.set(BASE_PRACTITIONERS_API_URL, { url: combineBaseApiUrl(BASE_PRACTITIONERS_API_URL), isSecured: true });
  endpoints.set(BASE_RELATED_PERSONS_API_URL, {
    url: combineBaseApiUrl(BASE_RELATED_PERSONS_API_URL),
    isSecured: true,
  });
  endpoints.set(BASE_HEALTHCARE_SERVICE_API_URL, {
    url: combineBaseApiUrl(BASE_HEALTHCARE_SERVICE_API_URL),
    isSecured: true,
  });
  return endpoints;
}

function combineBaseApiUrl(endpoint) {
  const baseApiUrl = getApiBaseUrl();
  return `${baseApiUrl}/${endpoint}`;
}
