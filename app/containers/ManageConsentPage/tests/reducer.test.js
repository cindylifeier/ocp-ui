
import { fromJS } from 'immutable';
import manageConsentPageReducer from '../reducer';

describe('manageConsentPageReducer', () => {
  it('returns the initial state', () => {
    expect(manageConsentPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
