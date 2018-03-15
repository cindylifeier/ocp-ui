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

const makeSelectPatient = () => createSelector(
  selectContextDomain,
  (substate) => substate.get('patient') && substate.get('patient').toJS(),
);

const makeSelectOrganization = () => createSelector(
  selectContextDomain,
  (substate) => substate.get('organization') && substate.get('organization').toJS(),
);

const makeSelectUser = () => createSelector(
  selectContextDomain,
  (substate) => substate.get('user') && substate.get('user').toJS(),
);

export default makeSelectContext;

export {
  selectContextDomain,
  makeSelectPatient,
  makeSelectOrganization,
  makeSelectUser,
};
