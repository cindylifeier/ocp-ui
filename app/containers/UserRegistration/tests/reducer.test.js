
import { fromJS } from 'immutable';
import userRegistrationReducer from '../reducer';

describe('userRegistrationReducer', () => {
  it('returns the initial state', () => {
    expect(userRegistrationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
