import { createSelector } from 'reselect';

/**
 * Direct selector to the context state domain
 */
const selectContextDomain = (state) => state.get('context');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Context
 */

const makeSelectContext = () => createSelector(
  selectContextDomain,
  (substate) => substate.toJS(),
);

const makeSelectPatientContext = () => createSelector(
  selectContextDomain,
  (substate) => substate.get('patient').toJS(),
);

const makeSelectOrganizationContext = () => createSelector(
  selectContextDomain,
  (substate) => substate.get('organization').toJS(),
);

const makeSelectUserContext = () => createSelector(
  selectContextDomain,
  (substate) => substate.get('user').toJS(),
);

export default makeSelectContext;

export {
  selectContextDomain,
  makeSelectPatientContext,
  makeSelectOrganizationContext,
  makeSelectUserContext,
};
