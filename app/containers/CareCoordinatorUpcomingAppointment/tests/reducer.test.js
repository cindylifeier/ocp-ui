
import { fromJS } from 'immutable';
import careCoordinatorUpcomingAppointmentReducer from '../reducer';

describe('careCoordinatorUpcomingAppointmentReducer', () => {
  it('returns the initial state', () => {
    expect(careCoordinatorUpcomingAppointmentReducer(undefined, {})).toEqual(fromJS({}));
  });
});
