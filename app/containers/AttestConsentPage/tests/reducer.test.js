
import { fromJS } from 'immutable';
import attestConsentPageReducer from '../reducer';

describe('attestConsentPageReducer', () => {
  it('returns the initial state', () => {
    expect(attestConsentPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
