import { fromJS } from 'immutable';
import managePractitionerPageReducer from '../reducer';

describe('managePractitionerPageReducer', () => {
  it('returns the initial state', () => {
    expect(managePractitionerPageReducer(undefined, {})).toEqual(fromJS({
      error: false,
      practitioner: null,
    }));
  });
});
