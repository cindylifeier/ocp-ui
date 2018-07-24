
import { fromJS } from 'immutable';
import manageUserRegistrationReducer from '../reducer';

describe('manageUserRegistrationReducer', () => {
  it('returns the initial state', () => {
    expect(manageUserRegistrationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
