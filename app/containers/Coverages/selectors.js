import { createSelector } from 'reselect';

/**
 * Direct selector to the coverages state domain
 */
const selectCoveragesDomain = (state) => state.get('coverages');

/**
 * Other specific selectors
 */

const makeSelectSubscriptionOptions = () => createSelector(
  selectCoveragesDomain,
  (coverageSubstate) => coverageSubstate && coverageSubstate.get('subscriptionOptions').toJS(),
);

const makeSelectCoverages = () => createSelector(
  selectCoveragesDomain,
  (coverageSubstate) => coverageSubstate && coverageSubstate.get('data').toJS(),
);

const makeSelectCoverageLoading = () => createSelector(
  selectCoveragesDomain,
  (coverageSubstate) => coverageSubstate && coverageSubstate.get('loading'),
);

const makeSelectCoverageError = () => createSelector(
  selectCoveragesDomain,
  (coverageSubstate) => coverageSubstate && coverageSubstate.get('error'),
);
export {
  makeSelectSubscriptionOptions,
  makeSelectCoverages,
  makeSelectCoverageLoading,
  makeSelectCoverageError,
};
