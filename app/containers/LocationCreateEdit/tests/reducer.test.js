
import { fromJS } from 'immutable';
import locationCreateEditReducer from '../reducer';

describe('locationCreateEditReducer', () => {
  it('returns the initial state', () => {
    expect(locationCreateEditReducer(undefined, {})).toEqual(fromJS({}));
  });
});
