
import { fromJS } from 'immutable';
import practitionerAppointmentsReducer from '../reducer';

describe('practitionerAppointmentsReducer', () => {
  it('returns the initial state', () => {
    expect(practitionerAppointmentsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
