
import {
  GET_ACTIVE_HEALTHCARE_SERVICES, GET_FILTERED_HEALTHCARE_SERVICES,
  INITIALIZE_HEALTHCARE_SERVICES,
} from '../constants';
import {
  getActiveHealthcareServices, getFilteredHealthcareServices,
  initializeHealthcareServices,
} from '../actions';

describe('HealthcareServices actions', () => {
  describe('Initialize healthcare services Action', () => {
    it('has a type of INITIALIZE_HEALTHCARE_SERVICES', () => {
      const expected = {
        type: INITIALIZE_HEALTHCARE_SERVICES,
      };
      expect(initializeHealthcareServices()).toEqual(expected);
    });
  });
  describe('Get Active Healthcare Services', () => {
    it('has a type of GET_ACTIVE_HEALTHCARE_SERVICES', () => {
      const expected = {
        type: GET_ACTIVE_HEALTHCARE_SERVICES,
      };
      expect(getActiveHealthcareServices('2', 'Organization', 1)).toEqual(expected);
    });
  });
  describe('Get filtered Healthcare Services', () => {
    it('has a type of GET_FILTERED_HEALTHCARE_SERVICES', () => {
      const expected = {
        type: GET_FILTERED_HEALTHCARE_SERVICES,
      };
      expect(getFilteredHealthcareServices(1, true)).toEqual(expected);
    });
  });
});
