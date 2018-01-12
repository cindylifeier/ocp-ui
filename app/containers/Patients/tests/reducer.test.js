
import { fromJS } from 'immutable';
import patientsReducer from '../reducer';

describe('patientsReducer', () => {
  it('returns the initial state', () => {
    expect(patientsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
