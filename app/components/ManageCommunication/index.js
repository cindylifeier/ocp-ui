/**
*
* ManageCommunication
*
*/

import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import find from 'lodash/find';
import Util from 'utils/Util';
import { getPatientName } from 'utils/PatientUtils';
import { isUndefined } from 'lodash';
import merge from 'lodash/merge';
import { FormattedMessage } from 'react-intl';
import { PATIENT, PRACTITIONER } from 'components/ManageCommunication/constants';
import ManageCommunicationForm from './ManageCommunicationForm';
import messages from './messages';
import { TEXT_AREA_MAX_LENGTH, TEXT_AREA_MIN_LENGTH, TEXT_MIN_LENGTH } from '../../containers/App/constants';

function ManageCommunication(props) {
  const {
    onSave,
    communicationStatus,
    communicationCategories,
    communicationNotDoneReasons,
    communicationMedia,
    episodeOfCares,
    handleOpen,
    selectedRecipients,
    handleRemoveRecipient,
    selectedPatient,
    communication,
    practitioner,
  } = props;
  const propsFromContainer = {
    communicationStatus,
    communicationCategories,
    communicationNotDoneReasons,
    communicationMedia,
    episodeOfCares,
    handleOpen,
    selectedRecipients,
    handleRemoveRecipient,
    selectedPatient,
    communication,
    practitioner,
  };
  const minimumLength = TEXT_MIN_LENGTH;
  const textAreaMaxLength = TEXT_AREA_MAX_LENGTH;
  const textAreaMinLength = TEXT_AREA_MIN_LENGTH;
  return (
    <Formik
      initialValues={setInitialValues(props.communication, selectedPatient, practitioner)}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        const communicationToBeSubmitted = mapToCommunication(
          values,
          communicationStatus,
          communicationCategories,
          communicationNotDoneReasons,
          communicationMedia,
          episodeOfCares,
          selectedPatient,
          practitioner,
          selectedRecipients);
        onSave(communicationToBeSubmitted, actions);
      }}
      validationSchema={() =>
        yup.lazy((values) => {
          console.log(values);
          return yup.object().shape({
            statusCode: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            notDone: yup.boolean()
              .required((<FormattedMessage {...messages.validation.required} />)),
            notDoneReasonCode: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            categoryCode: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            mediumCode: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            // recipients: yup.string()
            //   .required((<FormattedMessage {...messages.validation.required} />))
            //   .min(minimumLength, (<FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
            sent: yup.date()
              .required((<FormattedMessage {...messages.validation.required} />))
              .min(new Date().toLocaleDateString(), (<FormattedMessage {...messages.validation.minStartDate} />)),
            sender: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />))
              .min(minimumLength, (<FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
            payloadContent: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />))
              .max(textAreaMaxLength, (<FormattedMessage {...messages.validation.textAreaMaxLength} values={{ textAreaMaxLength }} />))
              .min(textAreaMinLength, (<FormattedMessage {...messages.validation.textAreaMinLength} values={{ textAreaMinLength }} />)),

          });
        }
        )
      }
      render={(formikProps) => <ManageCommunicationForm {...formikProps} {...propsFromContainer} />}
    >
    </Formik>
  );
}

ManageCommunication.propTypes = {
  onSave: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  communicationStatus: PropTypes.array.isRequired,
  communicationCategories: PropTypes.array.isRequired,
  communicationNotDoneReasons: PropTypes.array.isRequired,
  communicationMedia: PropTypes.array.isRequired,
  episodeOfCares: PropTypes.array.isRequired,
  selectedRecipients: PropTypes.array,
  selectedPatient: PropTypes.object.isRequired,
  communication: PropTypes.object,
  handleRemoveRecipient: PropTypes.func.isRequired,
  practitioner: PropTypes.object,
};

export default ManageCommunication;


function setInitialValues(communication, selectedPatient, practitioner) {
  let formData = null;
  if (selectedPatient) {
    formData = merge(
      mapToParticipantName(practitioner, 'sender'),
      mapToParticipantName(selectedPatient, 'subject')
    );
  }

  // if (!isEmpty(communication)) {
  //   formData = merge(
  //     mapToSender(selectedPatient, 'name')
  //     // mapLocationToFiledObject(location, 'status'),
  //     // mapLocationToFiledObject(location, 'physicalType'),
  //     // mapLocationToFiledObject(location, 'managingLocationLogicalId'),
  //     // mapLocationToAddressFields(location),
  //     // mapLocationToIdentifierFields(location),
  //     // mapLocationToTelecomFields(location)
  //   );
  // }
  return Util.pickByIdentity(formData);
}

function mapToParticipantName(participant, fieldName) {
  const fieldObject = {};
  if (!isUndefined(fieldName) && participant && participant.name && participant.name.length > 0) {
    fieldObject[fieldName] = Util.setEmptyStringWhenUndefined(getPatientName(participant.name[0]));
  }
  return fieldObject;
}

// function mapLocationToAddressFields(location) {
//   let fieldObject = {};
//   if (!isUndefined(location.address)) {
//     fieldObject = {
//       line1: Util.setEmptyStringWhenUndefined(location.address.line1),
//       line2: Util.setEmptyStringWhenUndefined(location.address.line2),
//       city: Util.setEmptyStringWhenUndefined(location.address.city),
//       stateCode: Util.setEmptyStringWhenUndefined(location.address.stateCode),
//       postalCode: Util.setEmptyStringWhenUndefined(location.address.postalCode),
//       countryCode: Util.setEmptyStringWhenUndefined(location.address.countryCode),
//       use: Util.setEmptyStringWhenUndefined(location.address.use),
//     };
//   }
//   return fieldObject;
// }
//
//
// function mapLocationToIdentifierFields(location) {
//   let fieldObject = {};
//   if (location.identifiers && location.identifiers.length > 0) {
//     fieldObject = {
//       identifierSystem: Util.setEmptyStringWhenUndefined(location.identifiers[0].system),
//       identifierValue: Util.setEmptyStringWhenUndefined(location.identifiers[0].value),
//     };
//   }
//   return fieldObject;
// }
//
// function mapLocationToTelecomFields(location) {
//   let fieldObject = {};
//   if (location.telecoms && location.telecoms.length > 0) {
//     fieldObject = {
//       telecomSystem: Util.setEmptyStringWhenUndefined(location.telecoms[0].system),
//       telecomSystemValue: Util.setEmptyStringWhenUndefined(location.telecoms[0].value),
//       telecomUse: Util.setEmptyStringWhenUndefined(location.telecoms[0].use),
//     };
//   }
//   return fieldObject;
// }

function mapToCommunication(values,
                            communicationStatus,
                            communicationCategories,
                            communicationNotDoneReasons,
                            communicationMedia,
                            episodeOfCares,
                            selectedPatient,
                            practitioner,
                            selectedRecipients) {
  const {
    statusCode,
    categoryCode,
    notDoneReasonCode,
    mediumCode,
    notDone,
    payloadContent,
    note,
    sent,
    // episodeOfCareCode,
  } = values;
  const status = find(communicationStatus, { code: statusCode });
  const category = find(communicationCategories, { code: categoryCode });
  const noteDoneReason = find(communicationNotDoneReasons, { code: notDoneReasonCode });
  const medium = find(communicationMedia, { code: mediumCode });
  // const episodeOfCare = find(episodeOfCares, { code: episodeOfCareCode });

  const communication = {
    note,
    payloadContent,
    notDone,
    sent: sent.toLocaleDateString(),
    received: sent.toLocaleDateString(),
    statusCode,
    statusValue: status.display,
    categoryCode,
    categoryValue: category.display,
    notDoneReasonCode,
    notDoneReasonValue: noteDoneReason.display,
    mediumCode,
    mediumVaule: medium.display, // TODO fix tipo in key
    subject: getReferenceObject(selectedPatient, PATIENT),
    sender: getReferenceObject(practitioner, PRACTITIONER), // TODO get this dynamically
    context: createEmptyReference(),
    topic: createEmptyReference(),
    definition: createEmptyReference(),
    recipient: selectedRecipients, // TODO change to recipients
  };
  return communication;
}

function getReferenceObject(object, referenceName) {
  return {
    reference: getReference(object, referenceName),
    display: getDisplay(object),
  };
}

function getReference(object, referenceName) {
  let referenceObject = '';
  if (object.id && referenceName) {
    referenceObject = referenceName.concat('/').concat(object.id);
  } else if (object.logicalId && referenceName) {
    referenceObject = referenceName.concat('/').concat(object.logicalId);
  }
  return referenceObject;
}

function getDisplay(object) {
  if (object.name && object.name.length > 0) {
    const name = object.name[0];
    return (name.firstName && name.lastName) ? name.firstName.concat(' ').concat(name.lastName) : '';
  }
  return '';
}

function createEmptyReference() {
  return {
    reference: '',
    display: '',
  };
}
