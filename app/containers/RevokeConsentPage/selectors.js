import { createSelector } from 'reselect';

/**
 * Direct selector to the revokeConsentPage state domain
 */
const selectRevokeConsentPageDomain = (state) => state.get('revokeConsentPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RevokeConsentPage
 */

const makeSelectRevokeConsentPage = () => createSelector(
  selectRevokeConsentPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectRevokeConsentPage;
export {
  selectRevokeConsentPageDomain,
};
