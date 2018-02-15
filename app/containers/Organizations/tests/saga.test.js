/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import rootSaga, { getOrganizationsSaga } from '../saga';
import { LOAD_ORGANIZATIONS } from '../constants';

// const generator = defaultSaga();

describe('rootSaga Saga', () => {
  it('it should takeLatest of LOAD_ORGANIZATIONS and delegate to getOrganizationsSaga ', () => {
    // Arrange
    const saga = rootSaga();

    // Act
    const effect = saga.next().value;

    // Assert
    expect(effect).toEqual(takeLatest(LOAD_ORGANIZATIONS, getOrganizationsSaga));
  });
});
