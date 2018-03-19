import { createSelector } from 'reselect';
import selectGlobalDomain from './selectors';

/**
 * Default selector used by workspace
 */
// Todo: will remove after integrate with context
const makeSelectWorkspace = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get('workspace').toJS(),
);

export default makeSelectWorkspace;
