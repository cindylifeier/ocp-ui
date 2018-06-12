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
  (substate) => substate.get('subscriptionOptions').toJS(),
);

export {
  makeSelectSubscriptionOptions,
};
