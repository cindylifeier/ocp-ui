
import { fromJS } from 'immutable';
import healthcareServicesReducer from '../reducer';

describe('healthcareServicesReducer', () => {
  it('returns the initial state', () => {
    expect(healthcareServicesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
