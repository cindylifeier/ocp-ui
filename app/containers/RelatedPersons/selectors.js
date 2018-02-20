import { createSelector } from 'reselect';

/**
 * Direct selector to the relatedPersons state domain
 */
const selectRelatedPersonsDomain = (state) => state.get('relatedPersons');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RelatedPersons
 */

const makeSelectRelatedPersons = () => createSelector(
  selectRelatedPersonsDomain,
  (substate) => substate.toJS()
);

export default makeSelectRelatedPersons;
export {
  selectRelatedPersonsDomain,
};
