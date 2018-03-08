
import { fromJS } from 'immutable';
import communicationReducer from '../reducer';

describe('communicationsReducer', () => {
  it('returns the initial state', () => {
    expect(communicationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
