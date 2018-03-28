
import { fromJS } from 'immutable';
import patientToDosReducer from '../reducer';

describe('patientToDosReducer', () => {
  it('returns the initial state', () => {
    expect(patientToDosReducer(undefined, {})).toEqual(fromJS({
      data: [],
      toDoMainTask: [],
      loading: false,
    }));
  });
});
