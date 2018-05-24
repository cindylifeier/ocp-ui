import { createSelector } from 'reselect';

/**
 * Direct selector to the consent2SharePage state domain
 */
const selectConsent2SharePageDomain = (state) => state.get('consent2SharePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Consent2SharePage
 */

const makeSelectConsent2SharePage = () => createSelector(
  selectConsent2SharePageDomain,
  (substate) => substate.toJS()
);

export default makeSelectConsent2SharePage;
export {
  selectConsent2SharePageDomain,
};
