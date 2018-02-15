/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call, put, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import rootSaga, { getOrganizationsSaga } from '../saga';
import { LOAD_ORGANIZATIONS } from '../constants';
import getOrganizations from '../api';
import { loadOrganizationsSuccess } from '../actions';

describe('Organizations.saga', () => {
  describe('rootSaga Saga', () => {
    it('it should takeLatest of LOAD_ORGANIZATIONS and delegate to getOrganizationsSaga ', () => {
      // Arrange
      const generator = rootSaga();

      // Act
      const effect = generator.next().value;

      // Assert
      expect(effect).toEqual(takeLatest(LOAD_ORGANIZATIONS, getOrganizationsSaga));
    });
  });

  describe('getOrganizationsSaga', () => {
    const searchValue = 'searchValue';
    const showInactive = true;
    const searchType = 'searchType';
    const currentPage = 10;
    const mockAction = fromJS({ searchValue, showInactive, searchType, currentPage });
    const mockOrganizations = fromJS(['a', 'b']);

    it('should handle successful api call when searchValue exists', () => {
      // Arrange
      const mockActionJS = mockAction.toJS();
      const generator = getOrganizationsSaga(mockActionJS);

      // Act
      const { value: apiCallEffect, done: apiCallIsLast } = generator.next();
      const { value: putOrganizationsEffect, done: putOrganizationsIsLast } = generator.next(mockOrganizations);
      const { value: finalValue, done: finalDone } = generator.next();

      // Assert
      expect(apiCallEffect).toEqual(call(getOrganizations, searchValue, showInactive, searchType, currentPage));
      expect(apiCallIsLast).toEqual(false);
      expect(putOrganizationsEffect).toEqual(put(loadOrganizationsSuccess(mockOrganizations)));
      expect(putOrganizationsIsLast).toEqual(false);
      expect(finalValue).toEqual(undefined);
      expect(finalDone).toEqual(true);
    });

    it('should do nothing when searchValue does not exist', () => {
      // Arrange
      const mockActionJS = mockAction
        .set('searchValue', '')
        .toJS();
      const generator = getOrganizationsSaga(mockActionJS);

      // Act
      const { value: finalValue, done: finalDone } = generator.next();

      // Assert
      expect(finalValue).toEqual(undefined);
      expect(finalDone).toEqual(true);
    });
  });
});
