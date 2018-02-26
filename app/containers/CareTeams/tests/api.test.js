import request from '../../../utils/request';
import * as endpointService from '../../../utils/endpointService';
import getCareTeams from '../api';

jest.mock('../../../utils/request');
jest.mock('../../../utils/endpointService');

describe('CareTeams api.js', () => {
  const mockRequest = jest.fn();
  const mockGetEndpoint = jest.fn();

  beforeEach(() => {
    mockGetEndpoint.mockReturnValue('/base-url/care-teams');
    endpointService.getEndpoint = mockGetEndpoint;
    request.mockImplementation(mockRequest);
  });

  afterEach(() => {
    mockRequest.mockReset();
    mockGetEndpoint.mockReset();
  });

  it('should call request with correct request url', () => {
    // Arrange
    const query = { searchValue: 'searchValue', searchType: 'searchType', pageNumber: 1, pageSize: 10 };
    const statusList = ['active', 'inactive'];
    const expected = '/base-url/care-teams/search?searchValue=searchValue&searchType=searchType&pageNumber=1&pageSize=10&statusList=active%2Cinactive';

    // Act
    getCareTeams(query, statusList);

    // Assert
    expect(mockGetEndpoint).toBeCalledWith(endpointService.BASE_CARE_TEAMS_API_URL);
    expect(mockRequest).toBeCalledWith(expected);
  });
});
