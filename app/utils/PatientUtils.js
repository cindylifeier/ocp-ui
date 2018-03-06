import { EMPTY_STRING } from 'containers/App/constants';
import { phoneSystem } from 'utils/constants';

export function mapToPatientName(patient) {
  const names = patient.name;
  return names && names
    .map((name) => {
      const firstName = name.firstName !== EMPTY_STRING ? name.firstName : EMPTY_STRING;
      const lastName = name.lastName !== EMPTY_STRING ? name.lastName : EMPTY_STRING;
      return `${firstName} ${lastName}`;
    })
    .join(', ');
}

export function mapToPatientPhone(patient) {
  const telecoms = patient.telecom;
  return telecoms && telecoms
    .filter((telecom) => telecom.system === phoneSystem)
    .map((telecom) => telecom.value)
    .join(', ');
}

export function mapToPatientAddress(patient) {
  const addresses = patient.address;
  return addresses && addresses
    .map((address) => combineAddress(address))
    .pop();
}

function combineAddress(address) {
  const addressStr = [];
  addressStr.push(address.line1 || '');
  addressStr.push(address.line2 || '');
  addressStr.push(address.city || '');
  addressStr.push(address.postalCode || '');
  addressStr.push(address.stateCode || '');
  addressStr.push(address.countryCode || '');
  return addressStr.filter((field) => field !== '').join(', ');
}
