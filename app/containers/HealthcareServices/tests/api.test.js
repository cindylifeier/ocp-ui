import request from '../../../utils/request';
import { getHealthcareServicesByOrganization } from '../api';

const mockRequest = jest.fn();

jest.mock('../../../apiBaseUrlConfig', () => (() => '/base-url'));
jest.mock('../../../utils/request');
jest.mock('../../../utils/queryString', () => (() => '?statusList=active%2Cinactive&pageNumber=1&pageSize=10'));
request.mockImplementation(mockRequest);

describe('Healthcare Services api.js', () => {
  it('returns the initial state', () => {
    // Arrange
    const expected = '/base-url/organizations/902/health-care-services?statusList=active%2Cinactive&pageNumber=1&pageSize=10';
    // Act
    getHealthcareServicesByOrganization(902, ['active', 'inactive'], 1);

    // Assert
    expect(mockRequest).toBeCalledWith(expected);
  });
});
