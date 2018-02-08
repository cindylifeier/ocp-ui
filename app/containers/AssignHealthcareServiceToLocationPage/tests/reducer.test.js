
import { fromJS } from 'immutable';
import assignHealthCareServiceToLocationPageReducer from '../reducer';

describe('assignHealthCareServiceToLocationPageReducer', () => {
  it('returns the initial state', () => {
    expect(assignHealthCareServiceToLocationPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
