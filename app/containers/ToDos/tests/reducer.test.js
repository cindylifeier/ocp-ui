
import { fromJS } from 'immutable';
import toDosReducer from '../reducer';

describe('toDosReducer', () => {
  it('returns the initial state', () => {
    expect(toDosReducer(undefined, {})).toEqual(fromJS({
      data: [],
      toDoMainTask: [],
      loading: false,
    }));
  });
});
