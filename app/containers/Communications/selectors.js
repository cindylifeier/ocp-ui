import { createSelector } from 'reselect';

/**
 * Direct selector to the communication state domain
 */
const selectCommunicationDomain = (state) => state.get('communications');

/**
 * Other specific selectors
 */

const makeSelectCommunications = () => createSelector(
  selectCommunicationDomain,
  (substate) => substate.get('data').toJS()
);

const makeSelectCommunicationsLoading = () => createSelector(
  selectCommunicationDomain,
  (substate) => substate.get('loading'),
);


export default makeSelectCommunications;
export {
  makeSelectCommunications,
  makeSelectCommunicationsLoading,
};
