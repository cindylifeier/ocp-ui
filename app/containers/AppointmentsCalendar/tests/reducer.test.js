
import { fromJS } from 'immutable';
import appointmentsCalendarReducer from '../reducer';

describe('appointmentsCalendarReducer', () => {
  it('returns the initial state', () => {
    expect(appointmentsCalendarReducer(undefined, {})).toEqual(fromJS({}));
  });
});
