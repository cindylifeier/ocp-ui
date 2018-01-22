
import { fromJS } from 'immutable';
import manageOrganizationPageReducer from '../reducer';

describe('manageOrganizationPageReducer', () => {
  it('returns the initial state', () => {
    expect(manageOrganizationPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
