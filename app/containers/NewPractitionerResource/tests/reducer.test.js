import { fromJS } from 'immutable';
import newPractitionerResourceReducer from '../reducer';

describe('newPractitionerResourceReducer', () => {
  it('returns the initial state', () => {
    expect(newPractitionerResourceReducer(undefined, {})).toEqual(fromJS({
      loading: false,
      practitioner: null,
      queryData: null,
      error: false,
    }));
  });
});
