import { fromJS } from 'immutable';
import practitionersReducer from '../reducer';

describe('practitionersReducer', () => {
  it('returns the initial state', () => {
    expect(practitionersReducer(undefined, {})).toEqual(fromJS({
      loading: false,
      error: false,
      searchPractitioners: {
        result: false,
        totalPages: 0,
        currentPageSize: 0,
        currentPage: 0,
      },
    }));
  });
});
