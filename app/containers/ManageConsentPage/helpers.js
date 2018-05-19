import isEqual from 'lodash/isEqual';
import Util from 'utils/Util';
import { CARE_COORDINATOR_ROLE_CODE } from 'containers/App/constants';

export function isCareCoordinator(roleCode) {
  return isEqual(roleCode, CARE_COORDINATOR_ROLE_CODE);
}

export function mapResourceName(nameArray) {
  let name = {};
  if (nameArray.length > 0) {
    const fName = nameArray[0];
    const firstName = Util.setEmptyStringWhenUndefined(fName.firstName);
    const lastName = Util.setEmptyStringWhenUndefined(fName.lastName);
    name = `${firstName}-${lastName}`;
  }
  return name;
}
