
import {
  getToDoSuccess,
} from '../actions';
import {
  GET_TO_DOS_SUCCESS,
} from '../constants';

describe('ToDos actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: GET_TO_DOS_SUCCESS,
        todos: undefined,
      };
      expect(getToDoSuccess()).toEqual(expected);
    });
  });
});
