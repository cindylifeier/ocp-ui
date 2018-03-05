import { createSelector } from 'reselect';

/**
 * Direct selector to the searchRecipient state domain
 */
const selectSearchRecipientDomain = (state) => state.get('searchRecipient');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SearchRecipient
 */

const makeSelectSearchRecipient = () => createSelector(
  selectSearchRecipientDomain,
  (substate) => substate.toJS()
);

export default makeSelectSearchRecipient;
export {
  selectSearchRecipientDomain,
};
