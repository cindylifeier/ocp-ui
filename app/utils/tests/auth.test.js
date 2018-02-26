import 'mock-local-storage';

import { checkAuthenticated, hasAccessScopeInToken } from '../auth';
import { storeAuthStatus, storeToken } from '../tokenService';

describe('auth.js', () => {
  afterEach(() => {
    sessionStorage.clear();
    // remove callback
    sessionStorage.itemInsertionCallback = null;
  });

  it('should return true if there is required access scope in token', () => {
    // Arrange
    const testToken = {
      access_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImxlZ2FjeS10b2tlbi1rZXkiLCJ0eXAiOiJKV1QifQ.eyJzY29wZSI6WyJvY3BVaS5hY2Nlc3MiLCJ0ZXN0LnNjb3BlIl19.x5SNNuL5E5DPiQT1ZzKSIlBF2AS8p6SE1F60_fSqxf0',
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
      access_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImxlZ2FjeS10b2tlbi1rZXkiLCJ0eXAiOiJKV1QifQ.eyJzY29wZSI6WyJvY3BVaS5hY2Nlc3MiLCJ0ZXN0LnNjb3BlIl19.x5SNNuL5E5DPiQT1ZzKSIlBF2AS8p6SE1F60_fSqxf0',
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
