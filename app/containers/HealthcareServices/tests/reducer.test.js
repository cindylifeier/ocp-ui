import { fromJS } from 'immutable';
import healthcareServicesReducer from '../reducer';

describe('healthcareServicesReducer', () => {
  it('returns the initial state', () => {
    expect(healthcareServicesReducer(undefined, {})).toEqual(fromJS({
      loading: false,
      error: false,
      data: [],
      organization: null,
      location: null,
      currentPage: 0,
      totalNumberOfPages: 0,
      includeInactive: false,
    }));
  });
});
