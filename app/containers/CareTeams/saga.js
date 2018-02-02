import { all, call, put, takeLatest } from 'redux-saga/effects';
import { DEFAULT_CARE_TEAM_STATUS_CODE, GET_CARE_TEAMS } from './constants';
import { getCareTeamsError, getCareTeamsSuccess } from './actions';
import getCareTeamsApi from './api';
import { showNotification } from '../Notification/actions';
import { CARETEAMSTATUS } from '../App/constants';
import { getLookupsAction } from '../App/actions';

export function* getCareTeams({ query }) {
  try {
    const careTeamsPage = yield call(getCareTeamsApi, query, [DEFAULT_CARE_TEAM_STATUS_CODE]);
    yield put(getCareTeamsSuccess(careTeamsPage));
  } catch (err) {
    yield put(getCareTeamsError(err));
    yield put(showNotification('Failed to retrieve patient\'s care teams, please try again.'));
  }
}

export function* watchGetCareTeams() {
  yield takeLatest(GET_CARE_TEAMS, getCareTeams);
}

export function* initializeLookups() {
  yield put(getLookupsAction([CARETEAMSTATUS]));
}

export default function* rootSaga() {
  yield all([
    initializeLookups(),
    watchGetCareTeams(),
  ]);
}
