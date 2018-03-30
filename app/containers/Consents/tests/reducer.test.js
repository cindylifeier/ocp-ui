
import { fromJS } from 'immutable';
import consentsReducer from '../reducer';

describe('consentsReducer', () => {
  it('returns the initial state', () => {
    expect(consentsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
