import { createSelector } from 'reselect';

/**
 * Direct selector to the healthcareServices state domain
 */
const selectHealthcareServicesDomain = (state) => state.get('healthcareServices');

/**
 * Other specific selectors
 */


/**
 * Default selector used by HealthcareServices
 */

const makeSelectHealthcareServices = () => createSelector(
  selectHealthcareServicesDomain,
  (substate) => substate.toJS()
);

export default makeSelectHealthcareServices;
export {
  selectHealthcareServicesDomain,
};
