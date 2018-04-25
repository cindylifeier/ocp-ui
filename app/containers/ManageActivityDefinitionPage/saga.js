import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';

import { showNotification } from 'containers/Notification/actions';
import { makeSelectOrganization } from 'containers/App/contextSelectors';
import { SAVE_ACTIVITY_DEFINITION } from './constants';
import { createActivityDefinition } from './api';
import { saveActivityDefinitionError } from './actions';

function* createActivityDefinitionSaga(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    yield call(createActivityDefinition, action.activityDefinitionFormData, organization.logicalId);
    yield put(showNotification('Successfully create the activity definition.'));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to create the Activity Definition.${getErrorDetail(error)}`));
    yield call(action.handleSubmitting);
    yield put(saveActivityDefinitionError(error));
  }
}

function* watchCreateActivityDefinitionSaga() {
  yield takeLatest(SAVE_ACTIVITY_DEFINITION, createActivityDefinitionSaga);
}

function getErrorDetail(err) {
  let errorDetail = '';
  if (err && err.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (err && err.response && err.response.status === 409) {
    errorDetail = ' Duplicate Entry:: Same Category and Type already exists.';
  } else if (err && err.response && err.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}

export default function* rootSaga() {
  yield all([
    watchCreateActivityDefinitionSaga(),
  ]);
}
