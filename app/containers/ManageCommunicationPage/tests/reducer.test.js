
import { fromJS } from 'immutable';
import manageCommunicationPageReducer from '../reducer';

describe('manageCommunicationPageReducer', () => {
  it('returns the initial state', () => {
    expect(manageCommunicationPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
