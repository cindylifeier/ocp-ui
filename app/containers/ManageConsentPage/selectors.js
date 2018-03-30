import { createSelector } from 'reselect';

/**
 * Direct selector to the manageConsentPage state domain
 */
const selectManageConsentPageDomain = (state) => state.get('manageConsentPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ManageConsentPage
 */

const makeSelectManageConsentPage = () => createSelector(
  selectManageConsentPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectManageConsentPage;
export {
  selectManageConsentPageDomain,
};
