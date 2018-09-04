import { fromJS } from 'immutable';
import addAppointmentParticipantReducer from '../reducer';

describe('addAppointmentParticipantReducer', () => {
  it('returns the initial state', () => {
    expect(addAppointmentParticipantReducer(undefined, {})).toEqual(fromJS({
      healthcareServices: null,
      locations: null,
      practitioners: null,
      searchParticipants: {
        loading: false,
        data: [],
        currentPage: 0,
        totalNumberOfPages: 0,
        error: false,
      },
    }));
  });
});
