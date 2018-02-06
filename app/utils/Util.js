import isUndefined from 'lodash/isUndefined';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';

import { EMPTY_STRING } from '../containers/App/constants';

class Util {
  static setEmptyStringWhenUndefined(value) {
    return isUndefined(value) ? EMPTY_STRING : value;
  }

  static pickByIdentity(dataObj) {
    return pickBy(dataObj, identity);
  }
}

export default Util;
