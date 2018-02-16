import { createSelector } from 'reselect';

/**
 * Direct selector to the loginPage state domain
 */
const selectAuthDomain = (state) => state.get('auth');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () => createSelector(
  selectAuthDomain,
  (substate) => substate.toJS(),
);

export default makeSelectLoginPage;
export {
  selectAuthDomain,
};
