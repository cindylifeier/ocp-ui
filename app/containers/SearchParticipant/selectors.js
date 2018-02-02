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

const makeSelectSearchParticipant = () => createSelector(
  selectSearchParticipantDomain,
  (substate) => substate.toJS()
);

export default makeSelectSearchParticipant;
export {
  selectSearchParticipantDomain,
};
