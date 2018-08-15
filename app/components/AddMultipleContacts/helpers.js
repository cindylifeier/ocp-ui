import identity from 'lodash/identity';

export function combineTelecoms(email, phone) {
  return [`Email: ${email}`, `Phone: ${phone}`].filter(identity).join('\n');
}

export function combineAddress(line1, line2, city, stateCode, postalCode, countryCode) {
  const firstLineAddress = [line1, line2].filter(identity).join(', ');
  const secondLineAddress = [city, stateCode, postalCode, countryCode].filter(identity).join(', ');
  return [firstLineAddress, secondLineAddress].filter(identity).join('\n');
}
