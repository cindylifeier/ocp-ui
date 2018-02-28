import { createSelector } from 'reselect';

/**
 * Direct selector to the communication state domain
 */
const selectCommunicationDomain = (state) => state.get('communication');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Communication
 */

const makeSelectCommunication = () => createSelector(
  selectCommunicationDomain,
  (substate) => substate.toJS()
);

export default makeSelectCommunication;
export {
  selectCommunicationDomain,
};
