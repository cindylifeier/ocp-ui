
import { fromJS } from 'immutable';
import locationsReducer from '../reducer';

describe('locationsReducer', () => {
  it('returns the initial state', () => {
    expect(locationsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
