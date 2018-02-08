import { fromJS } from 'immutable';
import {
  makeSelectCurrentPage,
  makeSelectHealthcareServices,
  makeSelectIncludeInactive,
  makeSelectLocation,
  makeSelectOrganization,
  makeSelectQueryError,
  makeSelectQueryLoading,
  makeSelectTotalNumberOfPages,
} from '../selectors';

describe('HealthcareServices selectors', () => {
  describe('makeSelectHealthcareServices', () => {
    it('should select data', () => {
      // Arrange
      const data = [
        { mockDataContent: 'mockDataContent1' },
        { mockDataContent: 'mockDataContent2' },
      ];
      const healthcareServices = {
        loading: false,
        error: false,
        data,
        organization: {
          id: '11111',
          name: 'Organization Name',
        },
        location: {
          id: '22222',
          name: 'Location Name',
        },
        currentPage: 1,
        totalNumberOfPages: 6,
        includeInactive: false,
      };
      const mockState = fromJS({
        healthcareServices,
      });

      // Act
      const substate = makeSelectHealthcareServices()(mockState);

      // Assert
      expect(substate).toEqual(data);
    });
  });

  describe('makeSelectQueryLoading', () => {
    it('should select loading', () => {
      // Arrange
      const data = [
        { mockDataContent: 'mockDataContent1' },
        { mockDataContent: 'mockDataContent2' },
      ];
      const loading = false;
      const healthcareServices = {
        loading,
        error: false,
        data,
        organization: {
          id: '11111',
          name: 'Organization Name',
        },
        location: {
          id: '22222',
          name: 'Location Name',
        },
        currentPage: 1,
        totalNumberOfPages: 6,
        includeInactive: false,
      };
      const mockState = fromJS({
        healthcareServices,
      });

      // Act
      const substate = makeSelectQueryLoading()(mockState);

      // Assert
      expect(substate).toEqual(loading);
    });
  });

  describe('makeSelectQueryError', () => {
    it('should select error', () => {
      // Arrange
      const data = [
        { mockDataContent: 'mockDataContent1' },
        { mockDataContent: 'mockDataContent2' },
      ];
      const loading = false;
      const error = false;
      const healthcareServices = {
        loading,
        error,
        data,
        organization: {
          id: '11111',
          name: 'Organization Name',
        },
        location: {
          id: '22222',
          name: 'Location Name',
        },
        currentPage: 1,
        totalNumberOfPages: 6,
        includeInactive: false,
      };
      const mockState = fromJS({
        healthcareServices,
      });

      // Act
      const substate = makeSelectQueryError()(mockState);

      // Assert
      expect(substate).toEqual(error);
    });
  });

  describe('makeSelectCurrentPage', () => {
    it('should select current page', () => {
      // Arrange
      const data = [
        { mockDataContent: 'mockDataContent1' },
        { mockDataContent: 'mockDataContent2' },
      ];
      const loading = false;
      const error = false;
      const currentPage = 10;
      const healthcareServices = {
        loading,
        error,
        data,
        organization: {
          id: '11111',
          name: 'Organization Name',
        },
        location: {
          id: '22222',
          name: 'Location Name',
        },
        currentPage,
        totalNumberOfPages: 6,
        includeInactive: false,
      };
      const mockState = fromJS({
        healthcareServices,
      });

      // Act
      const substate = makeSelectCurrentPage()(mockState);

      // Assert
      expect(substate).toEqual(currentPage);
    });
  });

  describe('makeSelectTotalNumberOfPages', () => {
    it('should select total number of pages', () => {
      // Arrange
      const data = [
        { mockDataContent: 'mockDataContent1' },
        { mockDataContent: 'mockDataContent2' },
      ];
      const loading = false;
      const error = false;
      const currentPage = 10;
      const totalNumberOfPages = 6;
      const healthcareServices = {
        loading,
        error,
        data,
        organization: {
          id: '11111',
          name: 'Organization Name',
        },
        location: {
          id: '22222',
          name: 'Location Name',
        },
        currentPage,
        totalNumberOfPages,
        includeInactive: false,
      };
      const mockState = fromJS({
        healthcareServices,
      });

      // Act
      const substate = makeSelectTotalNumberOfPages()(mockState);

      // Assert
      expect(substate).toEqual(totalNumberOfPages);
    });
  });

  describe('makeSelectIncludeInactive', () => {
    it('should select include inactive', () => {
      // Arrange
      const data = [
        { mockDataContent: 'mockDataContent1' },
        { mockDataContent: 'mockDataContent2' },
      ];
      const loading = false;
      const error = false;
      const currentPage = 10;
      const totalNumberOfPages = 6;
      const includeInactive = false;
      const healthcareServices = {
        loading,
        error,
        data,
        organization: {
          id: '11111',
          name: 'Organization Name',
        },
        location: {
          id: '22222',
          name: 'Location Name',
        },
        currentPage,
        totalNumberOfPages,
        includeInactive,
      };
      const mockState = fromJS({
        healthcareServices,
      });

      // Act
      const substate = makeSelectIncludeInactive()(mockState);

      // Assert
      expect(substate).toEqual(includeInactive);
    });
  });

  describe('makeSelectOrganization', () => {
    it('should select organization', () => {
      // Arrange
      const data = [
        { mockDataContent: 'mockDataContent1' },
        { mockDataContent: 'mockDataContent2' },
      ];
      const loading = false;
      const error = false;
      const currentPage = 10;
      const totalNumberOfPages = 6;
      const includeInactive = false;
      const organization = {
        id: '11111',
        name: 'Organization Name',
      };
      const healthcareServices = {
        loading,
        error,
        data,
        organization,
        location: {
          id: '22222',
          name: 'Location Name',
        },
        currentPage,
        totalNumberOfPages,
        includeInactive,
      };
      const mockState = fromJS({
        healthcareServices,
      });

      // Act
      const substate = makeSelectOrganization()(mockState);

      // Assert
      expect(substate.toJS()).toEqual(organization);
    });
  });

  describe('makeSelectLocation', () => {
    it('should select location', () => {
      // Arrange
      const data = [
        { mockDataContent: 'mockDataContent1' },
        { mockDataContent: 'mockDataContent2' },
      ];
      const loading = false;
      const error = false;
      const currentPage = 10;
      const totalNumberOfPages = 6;
      const includeInactive = false;
      const organization = {
        id: '11111',
        name: 'Organization Name',
      };
      const location = {
        id: '22222',
        name: 'Location Name',
      };
      const healthcareServices = {
        loading,
        error,
        data,
        organization,
        location,
        currentPage,
        totalNumberOfPages,
        includeInactive,
      };
      const mockState = fromJS({
        healthcareServices,
      });

      // Act
      const substate = makeSelectLocation()(mockState);

      // Assert
      expect(substate.toJS()).toEqual(location);
    });
  });
});
