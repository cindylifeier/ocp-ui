import { requestWithJWT } from '../../../utils/request';
import getCareTeams from '../api';

const mockRequest = jest.fn();

jest.mock('../../../apiBaseUrlConfig', () => (() => '/base-url'));
jest.mock('../../../utils/request');
requestWithJWT.mockImplementation(mockRequest);

describe('CareTeams api.js', () => {
  it('should call request with correct request url', () => {
    // Arrange
    const query = { searchValue: 'searchValue', searchType: 'searchType', pageNumber: 1, pageSize: 10 };
    const statusList = ['active', 'inactive'];
    const expected = '/base-url/care-teams/search?searchValue=searchValue&searchType=searchType&pageNumber=1&pageSize=10&statusList=active%2Cinactive';

    // Act
    getCareTeams(query, statusList);

    // Assert
    expect(mockRequest).toBeCalledWith(expected);
  });
});
