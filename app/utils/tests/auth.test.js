import { hasAccessScopeInToken } from '../auth';

describe('auth.js', () => {
  it('should has access scope in token', () => {
    // Arrange
    const testToken = {
      scope: ['ocpUi.access', 'test'],
    };

    // Act
    const hasAccessScopeInTestToken = hasAccessScopeInToken(testToken);

    // Assert
    expect(hasAccessScopeInTestToken).toBeTruthy();
  });
});
