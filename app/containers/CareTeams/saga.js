import { all, call, put, takeLatest, select } from 'redux-saga/effects';

import { makeSelectOrganization, makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import { getPractitionerIdByRole } from 'containers/App/helpers';
import { DEFAULT_CARE_TEAM_STATUS_CODE, GET_CARE_TEAMS } from './constants';
import { getCareTeamsError, getCareTeamsSuccess } from './actions';
import getCareTeamsApi from './api';
import { showNotification } from '../Notification/actions';

function getErrorMessage(err) {
  let errorMessage = '';
  if (err && err.message === 'Failed to fetch') {
    errorMessage = 'Failed to retrieve patient\'s care teams. Server is offline.';
  } else if (err && err.response && err.response.status === 404) {
    errorMessage = 'The patient does not have any care teams.';
  } else if (err && err.response && err.response.status === 500) {
    errorMessage = 'Failed to retrieve patient\'s care teams. Unknown server error.';
  } else {
    errorMessage = 'Failed to retrieve patient\'s care teams. Unknown error.';
  }
  return errorMessage;
}

export function* getCareTeams({ pageNumber, statusList }) {
  try {
    const patient = yield select(makeSelectPatient());
    const organization = yield select(makeSelectOrganization());
    const user = yield select(makeSelectUser());
    const practitionerId = getPractitionerIdByRole(user);
    const organizationId = (organization) ? organization.logicalId : undefined;
    if (!patient || !patient.id) {
      yield put(showNotification('No patient is selected.'));
    } else {
      const { id } = patient;
      const careTeamsPage = yield call(getCareTeamsApi, organizationId, practitionerId, id, pageNumber, [DEFAULT_CARE_TEAM_STATUS_CODE, ...statusList]);
      yield put(getCareTeamsSuccess(careTeamsPage));
    }
  } catch (err) {
    const errMsg = getErrorMessage(err);
    yield put(getCareTeamsError(err));
    yield put(showNotification(errMsg));
  }
}

export function* watchGetCareTeams() {
  yield takeLatest(GET_CARE_TEAMS, getCareTeams);
}

export default function* rootSaga() {
  yield all([
    watchGetCareTeams(),
  ]);
}
