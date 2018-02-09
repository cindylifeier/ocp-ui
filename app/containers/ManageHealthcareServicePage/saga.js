import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';
import { showNotification } from '../Notification/actions';
import { createHealthcareService } from './api';
import { createHealthcareServiceSuccess, createHealthcareServiceError } from './actions';
import { POST_HEALTHCARE_SERVICE } from '../ManageHealthcareServicePage/constants';
import { makeSelectOrganization } from '../Locations/selectors';


function* createHealthcareServiceSaga(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    const createHealthcareServiceResponse = yield call(createHealthcareService, action.healthcareServiceFormData, organization.id);
    yield put(createHealthcareServiceSuccess(createHealthcareServiceResponse));
    yield put(showNotification('Successfully create the healthcare service.'));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to create the Healthcare Service.${getErrorDetail(error)}`));
    yield call(action.handleSubmitting);
    yield put(createHealthcareServiceError(error));
  }
}

function* watchCreateHealthcareServiceSaga() {
  yield takeLatest(POST_HEALTHCARE_SERVICE, createHealthcareServiceSaga);
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
    watchCreateHealthcareServiceSaga(),
  ]);
}
