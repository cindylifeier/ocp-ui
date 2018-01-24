import request from '../../utils/request';

export default function createPractitioner(practitionerFormData) {
  const practitionerData = {
    firstName: practitionerFormData.firstName,
    middleName: practitionerFormData.middleName,
    lastName: practitionerFormData.lastName,
    roleType: practitionerFormData.roleType,
    identifierType: practitionerFormData.identifierType,
    identifierValue: practitionerFormData.identifierValue,
    address1: practitionerFormData.address1,
    address2: practitionerFormData.address2,
    city: practitionerFormData.city,
    state: practitionerFormData.state,
    postalCode: practitionerFormData.postalCode,
    country: practitionerFormData.country,
    email: practitionerFormData.email,
    phone: practitionerFormData.phone,
  };

  // Todo: Change url to bff
  const requestURL = 'http://localhost:8444/practitioners';
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(practitionerData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
