
import { fromJS } from 'immutable';
import patientCreateEditReducer from '../reducer';

describe('patientCreateEditReducer', () => {
  it('returns the initial state', () => {
    expect(patientCreateEditReducer(undefined, {})).toEqual(fromJS({}));
  });
});
