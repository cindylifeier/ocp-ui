/**
*
* ManageCommunication
*
*/

import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Util from 'utils/Util';
import { getPatientName } from 'utils/PatientUtils';
import { isUndefined } from 'lodash';
import merge from 'lodash/merge';
import { FormattedMessage } from 'react-intl';
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
        onSave(values, actions);
      }}
      validationSchema={() =>
        yup.lazy((values) => {
          console.log(values);
          return yup.object().shape({
            recipient: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />))
              .min(minimumLength, (<FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
            sender: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />))
              .min(minimumLength, (<FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
            payloadContent: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />))
              .max(textAreaMaxLength, (<FormattedMessage {...messages.validation.minLength} values={{ textAreaMaxLength }} />))
              .min(textAreaMinLength, (<FormattedMessage {...messages.validation.minLength} values={{ textAreaMinLength }} />)),
            category: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            notDone: yup.boolean()
              .required((<FormattedMessage {...messages.validation.required} />)),
            medium: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            status: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            sent: yup.date()
              .required((<FormattedMessage {...messages.validation.required} />))
              .min(new Date().toLocaleDateString(), (<FormattedMessage {...messages.validation.minStartDate} />)),
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
      mapToSender(practitioner, 'sender'),
      mapToSender(selectedPatient, 'subject')
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

function mapToSender(selectedPatient, fieldName) {
  const fieldObject = {};
  if (!isUndefined(fieldName) && selectedPatient && selectedPatient.name && selectedPatient.name.length > 0) {
    fieldObject[fieldName] = Util.setEmptyStringWhenUndefined(getPatientName(selectedPatient.name[0]));
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
