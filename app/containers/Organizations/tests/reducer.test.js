
import { fromJS } from 'immutable';
import organizationsReducer from '../reducer';

describe('organizationsReducer', () => {
  it('returns the initial state', () => {
    expect(organizationsReducer(undefined, {})).toEqual(fromJS({
      data: [],
      searchOrganizations: {
        loading: false,
        result: [],
        currentPage: 0,
        totalNumberOfPages: 0,
      },
    }));
  });
});
