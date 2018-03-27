
import { fromJS } from 'immutable';
import todosReducer from '../reducer';

describe('todosReducer', () => {
  it('returns the initial state', () => {
    expect(todosReducer(undefined, {})).toEqual(fromJS({
      data: [],
      todoMainTask: [],
      loading: false,
    }));
  });
});
