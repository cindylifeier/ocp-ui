
import { fromJS } from 'immutable';
import assignLocationToPractitionerPageReducer from '../reducer';

describe('assignLocationToPractitionerPageReducer', () => {
  it('returns the initial state', () => {
    expect(assignLocationToPractitionerPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
