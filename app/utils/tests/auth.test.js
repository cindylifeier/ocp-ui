import 'mock-local-storage';

import { checkAuthenticated, hasAccessScopeInToken } from '../auth';
import { storeAuthStatus, storeToken } from '../tokenService';

describe('auth.js', () => {
  it('should return true if there is required access scope in token', () => {
    // Arrange
    const testToken = {
      scope: ['ocpUi.access', 'test'],
    };

    // Act
    const hasAccessScopeInTestToken = hasAccessScopeInToken(testToken);

    // Assert
    expect(hasAccessScopeInTestToken).toBeTruthy();
  });

  it('should return false if there is no required access scope in token', () => {
    // Act
    const hasAccessScopeInTestToken = hasAccessScopeInToken(null);

    // Assert
    expect(hasAccessScopeInTestToken).toBeFalsy();
  });

  it('should return authStatus with correct status', () => {
    // Arrange
    const testToken = {
      scope: ['ocpUi.access', 'test'],
    };
    const testAuthStatus = true;

    // Act
    storeToken(testToken);
    storeAuthStatus(testAuthStatus);
    const isAuthenticated = checkAuthenticated();

    // Assert
    expect(isAuthenticated).toBeTruthy();
  });
});
