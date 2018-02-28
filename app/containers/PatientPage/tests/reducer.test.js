
import { fromJS } from 'immutable';
import patientPageReducer from '../reducer';

describe('patientPageReducer', () => {
  it('returns the initial state', () => {
    expect(patientPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
