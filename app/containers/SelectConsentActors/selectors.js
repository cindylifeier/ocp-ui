import { createSelector } from 'reselect';

/**
 * Direct selector to the selectConsentActors state domain
 */
const selectSelectConsentActorsDomain = (state) => state.get('selectConsentActors');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SelectConsentActors
 */

const makeSelectSelectConsentActors = () => createSelector(
  selectSelectConsentActorsDomain,
  (substate) => substate.toJS()
);

export default makeSelectSelectConsentActors;
export {
  selectSelectConsentActorsDomain,
};
