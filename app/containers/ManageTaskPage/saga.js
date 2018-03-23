import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { goBack, push } from 'react-router-redux';
import isEmpty from 'lodash/isEmpty';
import { createTask, getActivityDefinitions, getEventTypes, getOrganization, getTasksByPatient, getPractitioners, getRequester, getTaskById, getTaskByIdFromStore, updateTask } from 'containers/ManageTaskPage/api';
import { PATIENTS_URL } from 'containers/App/constants';
import { CREATE_TASK, GET_ACTIVITY_DEFINITIONS, GET_EVENT_TYPES, GET_ORGANIZATION, GET_PRACTITIONER, GET_PRACTITIONERS, GET_TASK, GET_TASKS_BY_PATIENT, PUT_TASK } from 'containers/ManageTaskPage/constants';
import makeSelectTasks from 'containers/Tasks/selectors';
import { showNotification } from 'containers/Notification/actions';
import {
  createTaskError,
  createTaskSuccess,
  getActivityDefinitionsError,
  getActivityDefinitionsSuccess,
  getEventTypesError,
  getEventTypesSuccess,
  getOrganizationError,
  getOrganizationSuccess,
  getPractitionersError,
  getPractitionersSuccess,
  getRequesterError,
  getRequesterSuccess,
  getTaskByIdError,
  getTaskByIdSuccess,
  updateTaskError,
  updateTaskSuccess,
  getTasksByPatientError,
  getTasksByPatientSuccess,
} from './actions';

export function* getOrganizationSaga(practitionerId) {
  try {
    const organization = yield call(getOrganization, practitionerId);
    yield put(getOrganizationSuccess(organization));
  } catch (err) {
    yield put(getOrganizationError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* watchGetOrganizationSaga() {
  yield takeLatest(GET_ORGANIZATION, getOrganizationSaga);
}

export function* getRequesterSaga(practitionerId) {
  try {
    const practitioner = yield call(getRequester, practitionerId);
    yield put(getRequesterSuccess(practitioner));
  } catch (err) {
    yield put(getRequesterError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* watchGetRequesterSaga() {
  yield takeLatest(GET_PRACTITIONER, getRequesterSaga);
}

export function* getActivityDefinitionsSaga(practitionerId) {
  try {
    const activityDefinitions = yield call(getActivityDefinitions, practitionerId);
    yield put(getActivityDefinitionsSuccess(activityDefinitions));
  } catch (err) {
    yield put(getActivityDefinitionsError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* watchGetActivityDefinitionsSaga() {
  yield takeLatest(GET_ACTIVITY_DEFINITIONS, getActivityDefinitionsSaga);
}

export function* getEventTypesSaga(patientId) {
  try {
    const eventTypes = yield call(getEventTypes, patientId);
    yield put(getEventTypesSuccess(eventTypes));
  } catch (err) {
    yield put(getEventTypesError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* watchGetEventTypesSaga() {
  yield takeLatest(GET_EVENT_TYPES, getEventTypesSaga);
}

export function* getTasksByPatientSaga(patientId) {
  try {
    const tasksByPatient = yield call(getTasksByPatient, patientId);
    yield put(getTasksByPatientSuccess(tasksByPatient));
  } catch (err) {
    yield put(getTasksByPatientError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* watchGetTasksByPatientSaga() {
  yield takeLatest(GET_TASKS_BY_PATIENT, getTasksByPatientSaga);
}

export function* getPractitionersSaga(practitionerId) {
  try {
    const practitioners = yield call(getPractitioners, practitionerId);
    yield put(getPractitionersSuccess(practitioners));
  } catch (err) {
    yield put(getPractitionersError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* watchGetPractitionersSaga() {
  yield takeLatest(GET_PRACTITIONERS, getPractitionersSaga);
}

function* createTaskSaga(action) {
  try {
    const createTaskResponse = yield call(createTask, action.taskFormData);
    yield put(createTaskSuccess(createTaskResponse));
    yield put(showNotification('Successfully create the Task Resource.'));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to create the Task Resource.${getErrorDetail(error)}`));
    yield call(action.handleSubmitting);
    yield put(createTaskError(error));
  }
}

function* watchCreateTaskSaga() {
  yield takeLatest(CREATE_TASK, createTaskSaga);
}

function* updateTaskSaga(action) {
  try {
    const updateTaskResponse = yield call(updateTask, action.taskFormData);
    yield put(updateTaskSuccess(updateTaskResponse));
    yield put(showNotification('Successfully update the Task Resource.'));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to update the Task Resource.${getErrorDetail(error)}`));
    yield call(action.handleSubmitting);
    yield put(updateTaskError(error));
  }
}

function* watchUpdateTaskSaga() {
  yield takeLatest(PUT_TASK, updateTaskSaga);
}


function* getTaskByIdSaga({ logicalId }) {
  try {
    let selectedTask;
    // Load Tasks from store
    const tasks = yield select(makeSelectTasks());
    selectedTask = getTaskByIdFromStore(tasks.data, logicalId);
    // fetch from backend if cannot find Task from store
    if (isEmpty(selectedTask)) {
      selectedTask = yield call(getTaskById, logicalId);
    }
    yield put(getTaskByIdSuccess(selectedTask));
  } catch (error) {
    yield put(showNotification('No matching Task found.'));
    yield put(push(PATIENTS_URL));
    yield put(getTaskByIdError(error));
  }
}

function* watchGetTaskByIdSaga() {
  yield takeLatest(GET_TASK, getTaskByIdSaga);
}

function getErrorDetail(err) {
  let errorDetail = '';
  if (err && err.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (err && err.response && err.response.status === 409) {
    errorDetail = ' Duplicate Entry:: Activity Definition already exists for the patient.';
  } else if (err && err.response && err.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetOrganizationSaga(),
    watchGetRequesterSaga(),
    watchGetActivityDefinitionsSaga(),
    watchGetPractitionersSaga(),
    watchCreateTaskSaga(),
    watchUpdateTaskSaga(),
    watchGetTaskByIdSaga(),
    watchGetEventTypesSaga(),
    watchGetTasksByPatientSaga(),
  ]);
}
