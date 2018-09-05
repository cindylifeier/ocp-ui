import isUndefined from 'lodash/isUndefined';

export function setInitialValue(initialValues) {
  let formValue = null;
  if (initialValues) {
    const episodeOfCare = initialValues.episodeOfCare;
    const { startDate, endDate } = episodeOfCare;
    formValue = {
      ...episodeOfCare,
      startDate: !isUndefined(startDate) ? new Date(startDate) : null,
      endDate: !isUndefined(endDate) ? new Date(endDate) : null,
      careManager: episodeOfCare.careManager.reference,
    };
  }
  return formValue;
}
