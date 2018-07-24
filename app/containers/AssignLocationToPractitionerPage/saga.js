import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import {
  getPractitionerLocationAssignmentSuccess,
  getPractitionerLocationAssignmentError,
  assignPractitionerLocationAssignmentError,
  markLocationAsAssigned,
} from 'containers/AssignLocationToPractitionerPage/actions';

import { makeSelectOrganization,
  makeSelectPractitioner,
} from 'containers/App/contextSelectors';
import { showNotification } from 'containers/Notification/actions';
import { GET_PRACTIONER_LOCATION_ASSIGNMENT,
  ASSIGN_PRACTITIONER_LOCATION_ASSIGNMENT,
} from 'containers/AssignLocationToPractitionerPage/constants';
import { getLocationWithPractitionerAssignmentData,
  assignPractitionerToLocation,
} from 'containers/AssignLocationToPractitionerPage/api';

export function* getPractitionerLocationAssignmentSaga(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    const practitioner = yield select(makeSelectPractitioner());
    if (isEmpty(organization) || isEmpty(practitioner) || isEmpty(organization.logicalId) || isEmpty(practitioner.logicalId)) {
      yield put(showNotification('Failed to retrieve Location , organization and/or practitioner is not selected.'));
    } else {
      const locations = yield call(getLocationWithPractitionerAssignmentData, organization.logicalId, practitioner.logicalId, action.currentPage);
      yield put(getPractitionerLocationAssignmentSuccess(locations));
    }
  } catch (error) {
    yield put(getPractitionerLocationAssignmentError(error));
    yield put(showNotification('Failed to retrieve locations, please try again.'));
  }
}

export function* assignPractitionerLocationAssignmentSaga(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    const practitioner = yield select(makeSelectPractitioner());
    if (isEmpty(organization) || isEmpty(practitioner) || isEmpty(organization.logicalId) || isEmpty(practitioner.logicalId)) {
      yield put(showNotification('Failed to assign the location to the current practitioner. Organization and/or practitioner is not selected.'));
    } else {
      yield call(assignPractitionerToLocation, action.practitionerId, organization.logicalId, action.locationId);
      yield put(markLocationAsAssigned(action.locationId));
      yield put(showNotification('The location is successfully assigned to current practitioner.'));
    }
  } catch (error) {
    yield put(assignPractitionerLocationAssignmentError(error));
    yield put(showNotification('Failed to assign the location to the current practitioner. Please try again.'));
  }
}


export function* watchGetPractitionerLocationAssignmentSaga() {
  yield takeLatest(GET_PRACTIONER_LOCATION_ASSIGNMENT, getPractitionerLocationAssignmentSaga);
}

export function* watchAssignPractitionerLocationAssignmentSaga() {
  yield takeLatest(ASSIGN_PRACTITIONER_LOCATION_ASSIGNMENT, assignPractitionerLocationAssignmentSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetPractitionerLocationAssignmentSaga(),
    watchAssignPractitionerLocationAssignmentSaga(),
  ]);
}
