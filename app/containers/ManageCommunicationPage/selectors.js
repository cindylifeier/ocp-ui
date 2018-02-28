import { createSelector } from 'reselect';

/**
 * Direct selector to the manageCommunicationPage state domain
 */
const selectManageCommunicationPageDomain = (state) => state.get('manageCommunicationPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ManageCommunicationPage
 */

const makeSelectManageCommunicationPage = () => createSelector(
  selectManageCommunicationPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectManageCommunicationPage;
export {
  selectManageCommunicationPageDomain,
};
