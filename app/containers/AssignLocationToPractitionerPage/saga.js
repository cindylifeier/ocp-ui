import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import {
  getPractitionerLocationAssignmentSuccess,
  getPractitionerLocationAssignmentError,
} from 'containers/AssignLocationToPractitionerPage/actions';

import { makeSelectOrganization,
  makeSelectPractitioner,
} from 'containers/App/contextSelectors';
import { showNotification } from 'containers/Notification/actions';
import { GET_PRACTIONER_LOCATION_ASSIGNMENT } from 'containers/AssignLocationToPractitionerPage/constants';
import { getLocationWithPractitionerAssignmentData } from 'containers/AssignLocationToPractitionerPage/api';

export function* getPractitionerLocationAssignmentSaga(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    const practitioner = yield select(makeSelectPractitioner());
    if (isEmpty(organization) || isEmpty(practitioner) || isEmpty(organization.logicalId) || isEmpty(practitioner.logicalId)) {
      yield put(showNotification('Failed to retrieve Location , organization and/or location is not selected.'));
    } else {
      // const status = [];
      // status.push(STATUS_ACTIVE);
      const locations = yield call(getLocationWithPractitionerAssignmentData, organization.logicalId, practitioner.logicalId, action.currentPage);
      yield put(getPractitionerLocationAssignmentSuccess(locations));
    }
  } catch (error) {
    yield put(getPractitionerLocationAssignmentError(error));
    yield put(showNotification('Failed to retrieve locations, please try again.'));
  }
}


export function* watchGetPractitionerLocationAssignmentSaga() {
  yield takeLatest(GET_PRACTIONER_LOCATION_ASSIGNMENT, getPractitionerLocationAssignmentSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetPractitionerLocationAssignmentSaga(),
  ]);
}
