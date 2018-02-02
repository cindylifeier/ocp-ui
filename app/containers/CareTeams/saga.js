import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_CARE_TEAMS } from './constants';
import { getCareTeamsError, getCareTeamsSuccess } from './actions';
import getCareTeamsApi from './api';
import { showNotification } from '../Notification/actions';

export function* getCareTeams({ query }) {
  try {
    const careTeamsPage = yield call(getCareTeamsApi, query);
    yield put(getCareTeamsSuccess(careTeamsPage));
  } catch (err) {
    yield put(getCareTeamsError(err));
    yield put(showNotification('Failed to retrieve patient\'s care teams, please try again.'));
  }
}

export default function* watchGetCareTeams() {
  yield takeLatest(GET_CARE_TEAMS, getCareTeams);
}
