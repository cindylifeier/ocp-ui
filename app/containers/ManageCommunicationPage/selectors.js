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

const makeSelectEpisodeOfCares = () => createSelector(
  selectManageCommunicationPageDomain,
  (substate) => substate.get('episodeOfCares').toJS()
);

const makeSelectPractitioner = () => createSelector(
  selectManageCommunicationPageDomain,
  (substate) => substate.get('practitioner').toJS()
);


const makeSelectCommunication = () => createSelector(
  selectManageCommunicationPageDomain,
  (substate) => substate.get('communication').toJS()
);


export default makeSelectManageCommunicationPage;
export {
  selectManageCommunicationPageDomain,
  makeSelectEpisodeOfCares,
  makeSelectPractitioner,
  makeSelectCommunication,
};
