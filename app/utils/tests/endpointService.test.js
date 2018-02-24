import {
  BASE_CARE_TEAMS_API_URL,
  BASE_HEALTHCARE_SERVICES_API_URL,
  BASE_LOCATION_API_URL,
  BASE_LOCATIONS_API_URL,
  BASE_ORGANIZATION_API_URL,
  BASE_ORGANIZATIONS_API_URL,
  BASE_PARTICIPANTS_API_URL,
  BASE_PATIENTS_API_URL,
  BASE_PRACTITIONERS_API_URL,
  BASE_RELATED_PERSONS_API_URL,
  BASE_TASKS_API_URL,
  getEndpoint,
  isSecuredEndpoint,
  LOGIN_API_URL,
  LOOKUPS_API_URL,
} from '../endpointService';

describe('endpointService.js', () => {
  it('should return with correct request url', () => {
    // Arrange
    const TEST_LOGIN_URL = '/ocp-ui-api/login';
    const TEST_LOOKUP_URL = '/ocp-ui-api/ocp-fis/lookups';
    const TEST_CARE_TEAMS_URL = '/ocp-ui-api/ocp-fis/care-teams';
    const TEST_ORGANIZATION_API_URL = '/ocp-ui-api/ocp-fis/organization';
    const TEST_ORGANIZATIONS_API_URL = '/ocp-ui-api/ocp-fis/organizations';
    const TEST_HEALTHCARE_SERVICES_API_URL = '/ocp-ui-api/ocp-fis/healthcare-services';
    const TEST_LOCATION_API_URL = '/ocp-ui-api/ocp-fis/location';
    const TEST_LOCATIONS_API_URL = '/ocp-ui-api/ocp-fis/locations';
    const TEST_PARTICIPANTS_API_URL = '/ocp-ui-api/ocp-fis/participants';
    const TEST_PATIENTS_API_URL = '/ocp-ui-api/ocp-fis/patients';
    const TEST_PRACTITIONERS_API_URL = '/ocp-ui-api/ocp-fis/practitioners';
    const TEST_RELATED_PERSONS_API_URL = '/ocp-ui-api/ocp-fis/related-persons';
    const TEST_TASKS_API_URL = '/ocp-ui-api/ocp-fis/tasks';

    // Act
    const loginUrl = getEndpoint(LOGIN_API_URL);
    const lookupUrl = getEndpoint(LOOKUPS_API_URL);
    const careTeamsUrl = getEndpoint(BASE_CARE_TEAMS_API_URL);
    const organizationUrl = getEndpoint(BASE_ORGANIZATION_API_URL);
    const organizationsUrl = getEndpoint(BASE_ORGANIZATIONS_API_URL);
    const healthcareServicesUrl = getEndpoint(BASE_HEALTHCARE_SERVICES_API_URL);
    const locationUrl = getEndpoint(BASE_LOCATION_API_URL);
    const locationsUrl = getEndpoint(BASE_LOCATIONS_API_URL);
    const participantsUrl = getEndpoint(BASE_PARTICIPANTS_API_URL);
    const patientsUrl = getEndpoint(BASE_PATIENTS_API_URL);
    const practitionersUrl = getEndpoint(BASE_PRACTITIONERS_API_URL);
    const relatedPersonsUrl = getEndpoint(BASE_RELATED_PERSONS_API_URL);
    const tasksUrl = getEndpoint(BASE_TASKS_API_URL);

    // Assert
    expect(loginUrl).toEqual(TEST_LOGIN_URL);
    expect(lookupUrl).toEqual(TEST_LOOKUP_URL);
    expect(careTeamsUrl).toEqual(TEST_CARE_TEAMS_URL);
    expect(organizationUrl).toEqual(TEST_ORGANIZATION_API_URL);
    expect(organizationsUrl).toEqual(TEST_ORGANIZATIONS_API_URL);
    expect(healthcareServicesUrl).toEqual(TEST_HEALTHCARE_SERVICES_API_URL);
    expect(locationUrl).toEqual(TEST_LOCATION_API_URL);
    expect(locationsUrl).toEqual(TEST_LOCATIONS_API_URL);
    expect(participantsUrl).toEqual(TEST_PARTICIPANTS_API_URL);
    expect(patientsUrl).toEqual(TEST_PATIENTS_API_URL);
    expect(practitionersUrl).toEqual(TEST_PRACTITIONERS_API_URL);
    expect(relatedPersonsUrl).toEqual(TEST_RELATED_PERSONS_API_URL);
    expect(tasksUrl).toEqual(TEST_TASKS_API_URL);
  });

  it('should throw No endpoint configured', () => {
    // Arrange
    const TEST_URL = '/test';

    // Act
    function getTestEndpoint() {
      getEndpoint(TEST_URL);
    }

    // Assert
    expect(getTestEndpoint).toThrowError(`No ${TEST_URL} endpoint configured`);
  });

  it('should verify the endpoint is unsecured or secured', () => {
    // Arrange
    const TEST_LOGIN_URL = '/ocp-ui-api/login?testquery';
    const TEST_LOOKUP_URL = '/ocp-ui-api/ocp-fis/lookups?testquery';
    const TEST_CARE_TEAMS_URL = '/ocp-ui-api/ocp-fis/care-teams?testquery';
    const TEST_ORGANIZATION_API_URL = '/ocp-ui-api/ocp-fis/organization?testquery';
    const TEST_ORGANIZATIONS_API_URL = '/ocp-ui-api/ocp-fis/organizations?testquery';
    const TEST_HEALTHCARE_SERVICES_API_URL = '/ocp-ui-api/ocp-fis/healthcare-services?testquery';
    const TEST_LOCATION_API_URL = '/ocp-ui-api/ocp-fis/location?testquery';
    const TEST_LOCATIONS_API_URL = '/ocp-ui-api/ocp-fis/locations?testquery';
    const TEST_PARTICIPANTS_API_URL = '/ocp-ui-api/ocp-fis/participants?testquery';
    const TEST_PATIENTS_API_URL = '/ocp-ui-api/ocp-fis/patients?testquery';
    const TEST_PRACTITIONERS_API_URL = '/ocp-ui-api/ocp-fis/practitioners?testquery';
    const TEST_RELATED_PERSONS_API_URL = '/ocp-ui-api/ocp-fis/related-persons?testquery';
    const TEST_TASKS_API_URL = '/ocp-ui-api/ocp-fis/tasks?testquery';

    // Act
    const isLoginUrlSecured = isSecuredEndpoint(TEST_LOGIN_URL);
    const isLookupUrlSecured = isSecuredEndpoint(TEST_LOOKUP_URL);

    const isCareTeamsUrlSecured = isSecuredEndpoint(TEST_CARE_TEAMS_URL);
    const isOrganizationUrlSecured = isSecuredEndpoint(TEST_ORGANIZATION_API_URL);
    const isOrganizationsUrlSecured = isSecuredEndpoint(TEST_ORGANIZATIONS_API_URL);
    const isHealthcareServicesUrlSecured = isSecuredEndpoint(TEST_HEALTHCARE_SERVICES_API_URL);
    const isLocationUrlSecured = isSecuredEndpoint(TEST_LOCATION_API_URL);
    const isLocationsUrlSecured = isSecuredEndpoint(TEST_LOCATIONS_API_URL);
    const isParticipantsUrlSecured = isSecuredEndpoint(TEST_PARTICIPANTS_API_URL);
    const isPatientsUrlSecured = isSecuredEndpoint(TEST_PATIENTS_API_URL);
    const isPractitionersUrlSecured = isSecuredEndpoint(TEST_PRACTITIONERS_API_URL);
    const isRelatedPersonsUrlSecured = isSecuredEndpoint(TEST_RELATED_PERSONS_API_URL);
    const isTasksUrlSecured = isSecuredEndpoint(TEST_TASKS_API_URL);

    // Assert
    expect(isLoginUrlSecured).toBeFalsy();
    expect(isLookupUrlSecured).toBeFalsy();

    expect(isCareTeamsUrlSecured).toBeTruthy();
    expect(isOrganizationUrlSecured).toBeTruthy();
    expect(isOrganizationsUrlSecured).toBeTruthy();
    expect(isHealthcareServicesUrlSecured).toBeTruthy();
    expect(isLocationUrlSecured).toBeTruthy();
    expect(isLocationsUrlSecured).toBeTruthy();
    expect(isParticipantsUrlSecured).toBeTruthy();
    expect(isPatientsUrlSecured).toBeTruthy();
    expect(isPractitionersUrlSecured).toBeTruthy();
    expect(isRelatedPersonsUrlSecured).toBeTruthy();
    expect(isTasksUrlSecured).toBeTruthy();
  });
});
