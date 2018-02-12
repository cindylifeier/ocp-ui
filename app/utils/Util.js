import isUndefined from 'lodash/isUndefined';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import eq from 'lodash/eq';
import sortBy from 'lodash/sortBy';
import isEqual from 'lodash/isEqual';
import upperCase from 'lodash/upperCase';

import { EMPTY_STRING } from '../containers/App/constants';

class Util {
  static setEmptyStringWhenUndefined(value) {
    return isUndefined(value) ? EMPTY_STRING : value;
  }

  static pickByIdentity(dataObj) {
    return pickBy(dataObj, identity);
  }

  static equalsIgnoreCase(stringValue, stringSource) {
    return eq(upperCase(stringValue), upperCase(stringSource));
  }

  static isUnorderedArraysEqual(array, otherArray, identityOfArray) {
    const sortedArray = sortBy(array, [(o) => o[identityOfArray]]);
    const sortedOtherArray = sortBy(otherArray, [(o) => o[identityOfArray]]);

    return isEqual(sortedArray, sortedOtherArray);
  }
}

export default Util;
