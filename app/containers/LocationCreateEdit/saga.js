import { takeLatest, call, put, select } from 'redux-saga/effects';
import { GET_US_STATES } from '../App/constants';
import { makeSelectUsStates } from '../App/selectors';
import { getUsStateError, getUsStateFromStore, getUsStateSuccess } from '../App/actions';
import getLookupStates from './api';

export function* getUsState(action) {
  try {
    let usStates = yield select(makeSelectUsStates());
    if (usStates && usStates.length > 0) {
      yield put(getUsStateFromStore());
    } else if (usStates.length === 0) {
      usStates = yield call(getLookupStates, action.lookupTypes);
      yield put(getUsStateSuccess(usStates));
    }
  } catch (err) {
    yield put(getUsStateError(err));
  }
}

// Individual exports for testing
export default function* watchGetUsStatesSaga() {
  yield takeLatest(GET_US_STATES, getUsState);
}
