import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';
import identity from 'lodash/identity';

import Util from 'utils/Util';
import { EMAIL_SYSTEM, PHONE_SYSTEM } from 'utils/constants';
import { combineAddress } from 'containers/App/helpers';

export function flattenFirstContact(contacts) {
  let flattenedContact = null;
  if (!isEmpty(contacts)) {
    const firstContact = head(contacts);
    const { name: { firstName, lastName }, telecoms, address } = firstContact;
    flattenedContact = {
      ...firstContact,
      name: `${firstName} ${lastName}`,
      telecoms: combineTelecoms(telecoms),
      address: combineAddress(address),
    };
  }
  return flattenedContact;
}

function combineTelecoms(telecoms) {
  const phone = telecoms && telecoms
    .filter((telecom) => Util.equalsIgnoreCase(telecom.system, PHONE_SYSTEM))
    .map((telecom) => telecom.value)
    .pop();

  const email = telecoms && telecoms
    .filter((telecom) => Util.equalsIgnoreCase(telecom.system, EMAIL_SYSTEM))
    .map((telecom) => telecom.value)
    .pop();
  return [`Email: ${email}`, `Phone: ${phone}`].filter(identity).join('\n');
}
