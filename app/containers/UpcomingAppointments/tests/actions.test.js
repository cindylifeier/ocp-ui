
import {
  getUpcomingAppointments,
  getUpcomingAppointmentsSuccess,
  getUpcomingAppointmentsError,
} from '../actions';
import {
  GET_UPCOMING_APPOINTMENTS,
  GET_UPCOMING_APPOINTMENTS_SUCCESS,
  GET_UPCOMING_APPOINTMENTS_ERROR,
} from '../constants';

describe('UpcomingAppointments actions', () => {
  describe('GetUpcomingAppointments Action', () => {
    it('has a type of GET_UPCOMING_APPOINTMENTS', () => {
      const expected = {
        type: GET_UPCOMING_APPOINTMENTS,
      };
      expect(getUpcomingAppointments()).toEqual(expected);
    });
    it('has a type of GET_UPCOMING_APPOINTMENTS_SUCCESS', () => {
      const expected = {
        type: GET_UPCOMING_APPOINTMENTS_SUCCESS,
      };
      expect(getUpcomingAppointmentsSuccess()).toEqual(expected);
    });
    it('has a type of GET_UPCOMING_APPOINTMENTS_ERROR', () => {
      const expected = {
        type: GET_UPCOMING_APPOINTMENTS_ERROR,
      };
      expect(getUpcomingAppointmentsError()).toEqual(expected);
    });
  });
});
