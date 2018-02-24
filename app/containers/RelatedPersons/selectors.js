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
  (substate) => substate.get('data').toJS()
);

const makeSelectRelatedPersonsSearchLoading = () => createSelector(
  selectRelatedPersonsDomain,
  (substate) => substate.get('loading'),
);

export default makeSelectRelatedPersons;
export {
  selectRelatedPersonsDomain,
  makeSelectRelatedPersonsSearchLoading,
};
