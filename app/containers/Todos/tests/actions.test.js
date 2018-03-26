
import {
  getTodoSuccess,
} from '../actions';
import {
  GET_TODOS_SUCCESS,
} from '../constants';

describe('Todos actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: GET_TODOS_SUCCESS,
        todos: undefined,
      };
      expect(getTodoSuccess()).toEqual(expected);
    });
  });
});
