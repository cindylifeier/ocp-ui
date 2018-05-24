
import { fromJS } from 'immutable';
import consent2SharePageReducer from '../reducer';

describe('consent2SharePageReducer', () => {
  it('returns the initial state', () => {
    expect(consent2SharePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
