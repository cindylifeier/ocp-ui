import isUndefined from 'lodash/isUndefined';

import { EMPTY_STRING } from '../containers/App/constants';

class Util {
  static setEmptyStringWhenUndefined(value) {
    return isUndefined(value) ? EMPTY_STRING : value;
  }
}

export default Util;
