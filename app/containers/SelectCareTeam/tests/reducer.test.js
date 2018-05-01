
import { fromJS } from 'immutable';
import selectCareTeamReducer from '../reducer';

xdescribe('selectCareTeamReducer', () => {
  it('returns the initial state', () => {
    expect(selectCareTeamReducer(undefined, {})).toEqual(fromJS({}));
  });
});
