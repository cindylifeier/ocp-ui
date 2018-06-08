
import { fromJS } from 'immutable';
import coveragesReducer from '../reducer';

describe('coveragesReducer', () => {
  it('returns the initial state', () => {
    expect(coveragesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
