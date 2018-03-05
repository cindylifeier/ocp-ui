/**
*
* ManageCommunication
*
*/

import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
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
  } = props;
  const propsFromContainer = {
    communicationStatus,
    communicationCategories,
    communicationNotDoneReasons,
    communicationMedia,
    episodeOfCares,
  };
  const initialValues = {};
  const minimumLength = TEXT_MIN_LENGTH;
  const textAreaMaxLength = TEXT_AREA_MAX_LENGTH;
  const textAreaMinLength = TEXT_AREA_MIN_LENGTH;
  return (
    <Formik
      initialValues={initialValues}
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
  communicationStatus: PropTypes.array.isRequired,
  communicationCategories: PropTypes.array.isRequired,
  communicationNotDoneReasons: PropTypes.array.isRequired,
  communicationMedia: PropTypes.array.isRequired,
  episodeOfCares: PropTypes.array.isRequired,
};

export default ManageCommunication;
