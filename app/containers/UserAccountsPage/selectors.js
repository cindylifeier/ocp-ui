import { createSelector } from 'reselect';

/**
 * Direct selector to the userAccountsPage state domain
 */
const selectUserAccountsPageDomain = (state) => state.get('userAccountsPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UserAccountsPage
 */

const makeSelectUserAccountsPage = () => createSelector(
  selectUserAccountsPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectUserAccountsPage;
export {
  selectUserAccountsPageDomain,
};
