import { createSelector } from 'reselect';
import selectGlobalDomain from './selectors';
import { GLOBAL_SHARED_DATA_KEY } from './constants';

/**
 * Default selector used by auth
 */

const makeSelectSelectedPatient = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get(GLOBAL_SHARED_DATA_KEY).get('selectedPatient').toJS(),
);

export default makeSelectSelectedPatient;
