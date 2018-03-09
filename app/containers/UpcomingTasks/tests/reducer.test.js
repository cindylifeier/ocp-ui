
import { fromJS } from 'immutable';
import upcomingTasksReducer from '../reducer';

describe('upcomingTasksReducer', () => {
  it('returns the initial state', () => {
    expect(upcomingTasksReducer(undefined, {})).toEqual(fromJS({}));
  });
});
