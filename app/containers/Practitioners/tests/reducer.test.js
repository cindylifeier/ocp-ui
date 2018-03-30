import { fromJS } from 'immutable';
import practitionersReducer from '../reducer';

describe('practitionersReducer', () => {
  it('returns the initial state', () => {
    expect(practitionersReducer(undefined, {})).toEqual(fromJS({
      listPractitioners: {
        loading: false,
        data: [],
        currentPage: 0,
        totalNumberOfPages: 0,
        error: false,
      },
      searchPractitioners: {
        loading: false,
        result: [],
        currentPage: 0,
        totalNumberOfPages: 0,
        error: false,
      },
    }));
  });
});
