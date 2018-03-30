
import { fromJS } from 'immutable';
import patientAppointmentsReducer from '../reducer';

describe('patientAppointmentsReducer', () => {
  it('returns the initial state', () => {
    expect(patientAppointmentsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
