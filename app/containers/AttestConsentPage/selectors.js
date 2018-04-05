import { createSelector } from 'reselect';

/**
 * Direct selector to the attestConsentPage state domain
 */
const selectAttestConsentPageDomain = (state) => state.get('attestConsentPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AttestConsentPage
 */

const makeSelectAttestConsentPage = () => createSelector(
  selectAttestConsentPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectAttestConsentPage;
export {
  selectAttestConsentPageDomain,
};
