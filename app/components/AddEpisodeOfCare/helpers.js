import find from 'lodash/find';

export function setInitialValue(initialValues) {
  let formValue = null;
  if (initialValues) {
    const episodeOfCare = initialValues.episodeOfCare;
    formValue = {
      ...episodeOfCare,
      startDate: new Date(episodeOfCare.startDate),
      endDate: new Date(episodeOfCare.endDate),
      careManager: episodeOfCare.careManager.reference,
    };
  }
  return formValue;
}

export function mapCareManager(values, practitioners) {
  const { careManager } = values;
  const selectedCareManager = find(practitioners, { reference: careManager });
  return {
    ...values,
    careManager: selectedCareManager,
  };
}
