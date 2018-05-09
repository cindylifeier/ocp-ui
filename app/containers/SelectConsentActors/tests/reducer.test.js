
import { fromJS } from 'immutable';
import selectConsentActorsReducer from '../reducer';

describe('selectConsentActorsReducer', () => {
  it('returns the initial state', () => {
    expect(selectConsentActorsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
