import { createSelector } from 'reselect';

/**
 * Direct selector to the searchParticipant state domain
 */
const selectSearchParticipantDomain = (state) => state.get('searchParticipant');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SearchParticipant
 */

const makeSelectSearchParticipantResults = () => createSelector(
  selectSearchParticipantDomain,
  (substate) => substate.get('searchParticipantResult').toJS()
);

export {
  selectSearchParticipantDomain,
  makeSelectSearchParticipantResults,
};
