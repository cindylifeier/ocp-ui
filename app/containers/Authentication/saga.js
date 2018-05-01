import { all, put, takeLatest } from 'redux-saga/effects';
import queryString from 'utils/queryString';
import { AUTOLOGIN } from './constants';
import { autologinError } from './actions';

function* autologinSaga({ code }) {
  try {
    const currentLocation = window.location;
    /* eslint-disable camelcase */
    if (code) {
      // TODO: retrieve the UAA endpoint config from backend
      const endpoint = 'http://localhost:8080/uaa/autologin';
      const client_id = 'ocp-ui';
      const autologin_redirect_uri = currentLocation;
      const q = { code, client_id, autologin_redirect_uri };
      const autologinUrl = `${endpoint}${queryString(q)}`;
      window.location = autologinUrl;
    }
  } catch (error) {
    yield put(autologinError(error.message));
  }
}

function* watchAutologinSaga() {
  yield takeLatest(AUTOLOGIN, autologinSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchAutologinSaga(),
  ]);
}
