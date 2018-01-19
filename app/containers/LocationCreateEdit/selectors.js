import { createSelector } from 'reselect';

/**
 * Direct selector to the locationCreateEdit state domain
 */
const selectLocationCreateEditDomain = (state) => state.get('locationCreateEdit');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LocationCreateEdit
 */

const makeSelectLocationCreateEdit = () => createSelector(
  selectLocationCreateEditDomain,
  (substate) => substate.toJS()
);

export default makeSelectLocationCreateEdit;
export {
  selectLocationCreateEditDomain,
};
