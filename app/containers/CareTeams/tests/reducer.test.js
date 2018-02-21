
import { fromJS } from 'immutable';
import careTeamsReducer from '../reducer';

describe('careTeamsReducer', () => {
  it('returns the initial state', () => {
    expect(careTeamsReducer(undefined, {})).toEqual(fromJS({
      loading: false,
      patientName: null,
      data: null,
      query: null,
      statusList: [],
    }));
  });
});
