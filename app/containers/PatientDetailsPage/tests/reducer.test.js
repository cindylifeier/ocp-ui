
import { fromJS } from 'immutable';
import patientDetailsPageReducer from '../reducer';

describe('patientDetailsPageReducer', () => {
  it('returns the initial state', () => {
    expect(patientDetailsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
