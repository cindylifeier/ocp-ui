
import { fromJS } from 'immutable';
import organizationsReducer from '../reducer';

describe('organizationsReducer', () => {
  it('returns the initial state', () => {
    expect(organizationsReducer(undefined, {})).toEqual(fromJS({
      listOrganizations: {
        loading: false,
        data: [],
        currentPage: 0,
        totalNumberOfPages: 0,
      },
      searchOrganizations: {
        loading: false,
        result: [],
        currentPage: 0,
        totalNumberOfPages: 0,
      },
    }));
  });
});
