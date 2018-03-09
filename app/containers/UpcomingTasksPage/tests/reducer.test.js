
import { fromJS } from 'immutable';
import upcomingTasksPageReducer from '../reducer';

describe('upcomingTasksPageReducer', () => {
  it('returns the initial state', () => {
    expect(upcomingTasksPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
