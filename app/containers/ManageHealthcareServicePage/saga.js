import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { goBack, push } from 'react-router-redux';
import isEmpty from 'lodash/isEmpty';
import { showNotification } from '../Notification/actions';
import {
  createHealthcareService, editHealthcareService, getHealthcareServiceById, getHealthcareServiceByIdFromStore,
} from './api';
import {
  createHealthcareServiceSuccess, createHealthcareServiceError, editHealthcareServiceError,
  editHealthcareServiceSuccess, getHealthcareServiceByIdSuccess,
  getHealthcareServiceByIdError,
} from './actions';
import { makeSelectOrganization } from '../Locations/selectors';
import { GET_HEALTHCARE_SERVICE, CREATE_HEALTHCARE_SERVICE, UPDATE_HEALTHCARE_SERVICE } from './constants';
import { HOME_URL } from '../App/constants';
import { makeSelectHealthcareServices } from '../HealthcareServices/selectors';

function* createHealthcareServiceSaga(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    const createHealthcareServiceResponse = yield call(createHealthcareService, action.healthcareServiceFormData, organization.id);
    yield put(createHealthcareServiceSuccess(createHealthcareServiceResponse));
    yield put(showNotification('Successfully created the healthcare service.'));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to create the Healthcare Service.${getErrorDetail(error)}`));
    yield call(action.handleSubmitting);
    yield put(createHealthcareServiceError(error));
  }
}

function* watchCreateHealthcareServiceSaga() {
  yield takeLatest(CREATE_HEALTHCARE_SERVICE, createHealthcareServiceSaga);
}

function* editHealthcareServiceSaga(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    const editHealthcareServiceResponse = yield call(editHealthcareService, action.healthcareServiceFormData, organization.id);
    yield put(editHealthcareServiceSuccess(editHealthcareServiceResponse));
    yield put(showNotification('Successfully edited the healthcare service.'));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to edit the Healthcare Service.${getErrorDetail(error)}`));
    yield call(action.handleSubmitting);
    yield put(editHealthcareServiceError(error));
  }
}

function* watchEditHealthcareServiceSaga() {
  yield takeLatest(UPDATE_HEALTHCARE_SERVICE, editHealthcareServiceSaga);
}

function* getHealthcareServiceByIdSaga({ logicalId }) {
  try {
    let selectedHealthcareService;
    // Load HealthcareServices from store
    const healthcareServices = yield select(makeSelectHealthcareServices());
    selectedHealthcareService = getHealthcareServiceByIdFromStore(healthcareServices, logicalId);
    // fetch from backend if cannot find HealthcareService from store
    if (isEmpty(selectedHealthcareService)) {
      selectedHealthcareService = yield call(getHealthcareServiceById, logicalId);
    }
    yield put(getHealthcareServiceByIdSuccess(selectedHealthcareService));
  } catch (error) {
    yield put(showNotification('No matching healthcare service found.'));
    yield put(push(HOME_URL));
    yield put(getHealthcareServiceByIdError(error));
  }
}

function* watchGetHealthcareServiceSaga() {
  yield takeLatest(GET_HEALTHCARE_SERVICE, getHealthcareServiceByIdSaga);
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
    watchEditHealthcareServiceSaga(),
    watchGetHealthcareServiceSaga(),
  ]);
}
