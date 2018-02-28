/**
 *
 * ManageTask
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import yup from 'yup';
import { FormattedMessage } from 'react-intl';
import ManageTaskForm from './ManageTaskForm';
import messages from './messages';

function ManageTask(props) {
  const {
    onSave, taskStatus, requestIntent,
    requestPriority, taskPerformerType, selectedPatient,
    organization, activityDefinitions, practitioners,
  } = props;
  const formData = {
    taskStatus,
    requestIntent,
    requestPriority,
    taskPerformerType,
    selectedPatient,
    organization,
    activityDefinitions,
    practitioners,
  };

  return (
    <div>
      {selectedPatient && organization &&
      <Formik
        onSubmit={(values, actions) => {
          onSave(values, actions);
        }}
        validationSchema={yup.object().shape({
          status: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          intent: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          priority: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          performerType: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          activityDefinition: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          practitioners: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          taskOwner: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          organization: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
        })}
        render={(formikProps) => <ManageTaskForm {...formikProps} {...formData} />}
      />
      }
    </div>
  );
}

ManageTask.propTypes = {
  onSave: PropTypes.func.isRequired,
  taskStatus: PropTypes.array.isRequired,
  requestIntent: PropTypes.array.isRequired,
  requestPriority: PropTypes.array.isRequired,
  taskPerformerType: PropTypes.array.isRequired,
  selectedPatient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
  }),
  organization: PropTypes.array,
  activityDefinitions: PropTypes.array,
  practitioners: PropTypes.array,
};

export default ManageTask;
