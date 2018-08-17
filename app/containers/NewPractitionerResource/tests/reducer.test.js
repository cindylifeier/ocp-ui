
import { fromJS } from 'immutable';
import newPractitionerResourceReducer from '../reducer';

describe('newPractitionerResourceReducer', () => {
  it('returns the initial state', () => {
    expect(newPractitionerResourceReducer(undefined, {})).toEqual(fromJS({}));
  });
});
