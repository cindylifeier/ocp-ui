import { createSelector } from 'reselect';

/**
 * Direct selector to the manageHealthcareServicePage state domain
 */
const selectManageHealthcareServicePageDomain = (state) => state.get('manageHealthcareServicePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ManageHealthcareServicePage
 */

const makeSelectManageHealthcareServicePage = () => createSelector(
  selectManageHealthcareServicePageDomain,
  (substate) => substate.toJS()
);

export default makeSelectManageHealthcareServicePage;
export {
  selectManageHealthcareServicePageDomain,
};
