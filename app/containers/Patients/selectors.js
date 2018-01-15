import { createSelector } from 'reselect';

/**
 * Direct selector to the patients
 */
const selectPatients = (state) => state.get('patients');

/**
 * Other specific selectors
 */
const makeSelectPatients = () => createSelector(
  selectPatients,
  (substate) => substate.get('patients')
);

const makeSelectSearchLoading = () => createSelector(
  selectPatients,
  (patientsState) => patientsState.get('loading'),
);

const makeSelectSearchError = () => createSelector(
  selectPatients,
  (patientsState) => patientsState.get('error'),
);

const makeSelectSearchTerms = () => createSelector(
  selectPatients,
  (patientsState) => patientsState.get('searchTerms'),
);

const makeSelectSearchType = () => createSelector(
  selectPatients,
  (patientsState) => patientsState.get('searchType'),
);

const makeSelectShowInactive = () => createSelector(
  selectPatients,
  (patientsState) => patientsState.get('showInactive'),
);


const makeSelectSearchResult = () => createSelector(
  selectPatients,
  (patientsState) => patientsState.getIn(['searchPatients', 'result']),
);


export default makeSelectPatients;
export {
  selectPatients,
  makeSelectSearchTerms,
  makeSelectSearchType,
  makeSelectSearchLoading,
  makeSelectSearchError,
  makeSelectSearchResult,
  makeSelectShowInactive,
};
