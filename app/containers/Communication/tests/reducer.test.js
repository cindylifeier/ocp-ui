
import { fromJS } from 'immutable';
import communicationReducer from '../reducer';

describe('communicationReducer', () => {
  it('returns the initial state', () => {
    expect(communicationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
