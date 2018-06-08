import { createSelector } from 'reselect';

/**
 * Direct selector to the coverages state domain
 */
const selectCoveragesDomain = (state) => state.get('coverages');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Coverages
 */

const makeSelectCoverages = () => createSelector(
  selectCoveragesDomain,
  (substate) => substate.toJS()
);

export default makeSelectCoverages;
export {
  selectCoveragesDomain,
};
