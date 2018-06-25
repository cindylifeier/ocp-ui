// import { take, call, put, select } from 'redux-saga/effects';

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { GET_GROUPS, GET_SCOPES } from './constants';
import { getGroups, getScopes } from './api';
import { getGroupsError, getGroupsSuccess, getScopesSuccess, getScopesError } from './actions';

export function* getGroupsSaga() {
  try {
    const groups = yield call(getGroups);
    yield put(getGroupsSuccess(groups));
  } catch (err) {
    yield put(getGroupsError(err));
  }
}


export function* getScopesSaga() {
  try {
    const scopes = yield call(getScopes);
    yield put(getScopesSuccess(scopes));
  } catch (err) {
    yield put(getScopesError(err));
  }
}


export function* watchGetGroupsSaga() {
  yield takeLatest(GET_GROUPS, getGroupsSaga);
}


export function* watchGetScopesSaga() {
  yield takeLatest(GET_SCOPES, getScopesSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetGroupsSaga(),
    watchGetScopesSaga(),
  ]);
}
