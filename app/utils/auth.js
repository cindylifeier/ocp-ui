import isEmpty from 'lodash/isEmpty';
import includes from 'lodash/includes';

const ACCESS_SCOPE = 'ocpUi.access';

export function hasAccessScopeInToken(token) {
  if (!isEmpty(token)) {
    return includes(token.scope, ACCESS_SCOPE);
  }
  return false;
}
