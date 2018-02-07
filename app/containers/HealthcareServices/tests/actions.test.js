
import {
  GET_ACTIVE_HEALTHCARE_SERVICES, GET_FILTERED_HEALTHCARE_SERVICES, GET_HEALTHCARE_SERVICES_ERROR,
  GET_HEALTHCARE_SERVICES_SUCCESS,
  INITIALIZE_HEALTHCARE_SERVICES,
} from '../constants';
import {
  getActiveHealthcareServices, getFilteredHealthcareServices, getHealthcareServicesError, getHealthcareServicesSuccess,
  initializeHealthcareServices,
} from '../actions';

describe('HealthcareServices actions', () => {
  describe('Initialize healthcare services Action', () => {
    it('has a type of INITIALIZE_HEALTHCARE_SERVICES', () => {
      // Arrange
      const expected = {
        type: INITIALIZE_HEALTHCARE_SERVICES,
      };
      // Act
      const action = initializeHealthcareServices();
      // Assert
      expect(action).toEqual(expected);
    });
  });
  describe('Get Active Healthcare Services', () => {
    it('has a type of GET_ACTIVE_HEALTHCARE_SERVICES', () => {
      // Arrange
      const currentPage = 1;
      const organizationId = '2';
      const organizationName = 'Organization';
      const expected = {
        currentPage,
        organizationId,
        organizationName,
        type: GET_ACTIVE_HEALTHCARE_SERVICES,
      };
      // Act
      const action = getActiveHealthcareServices(organizationId, organizationName, currentPage);
      // Assert
      expect(action).toEqual(expected);
    });
  });
  describe('Get filtered Healthcare Services', () => {
    it('has a type of GET_FILTERED_HEALTHCARE_SERVICES', () => {
      // Arrange
      const currentPage = 1;
      const includeInactive = true;
      const expected = {
        currentPage,
        includeInactive,
        type: GET_FILTERED_HEALTHCARE_SERVICES,
      };
      // Act
      const action = getFilteredHealthcareServices(currentPage, includeInactive);
      // Assert
      expect(action).toEqual(expected);
    });
  });
  describe('Get Healthcare Services SUCCESS', () => {
    it('has a type of GET_HEALTHCARE_SERVICES_SUCCESS', () => {
      // Arrange
      const healthcareServicesPage = {
        currentPage: 1,
        elements: [{ organizationId: '902' }],
      };
      const expected = {
        type: GET_HEALTHCARE_SERVICES_SUCCESS,
        healthcareServices: healthcareServicesPage,
      };

      // Act
      const action = getHealthcareServicesSuccess(healthcareServicesPage);

      // Assert
      expect(action).toEqual(expected);
    });
  });
  describe('Get Healthcare Service Error Action', () => {
    it('has a type of GET_HEALTHCARE_SERVICES_ERROR', () => {
      // Arrange
      const error = new Error('error');
      const expected = {
        type: GET_HEALTHCARE_SERVICES_ERROR,
        error,
      };

      // Act
      const action = getHealthcareServicesError(error);

      // Assert
      expect(action).toEqual(expected);
    });
  });
});
