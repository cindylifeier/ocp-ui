/**
 *
 * ManageTask
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import isEmpty from 'lodash/isEmpty';
import Util from 'utils/Util';
import yup from 'yup';
import { Formik } from 'formik';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import ManageTaskForm from './ManageTaskForm';


function ManageTask(props) {
  const {
    onSave, taskStatus, requestIntent,
    requestPriority, taskPerformerType, selectedPatient,
    organization, activityDefinitions, practitioners,
    currentTask, editMode,
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
    editMode,
  };

  return (
    <div>
      {((editMode && currentTask) || !editMode) &&
      <Formik
        initialValues={setFormData(currentTask)}
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
  editMode: PropTypes.bool.isRequired,
  currentTask: PropTypes.any,
};
function setFormData(currentTask) {
  let formData = null;
  if (!isEmpty(currentTask)) {
    formData = merge(Util.pickByIdentity(mapTaskToEditForm(currentTask)));
  }
  return Util.pickByIdentity(formData);
}


function mapTaskToEditForm(task) {
  // Drop down values
  let priority = {};
  if (task.priority && task.priority.code) {
    priority = {
      priority: Util.setEmptyStringWhenUndefined(task.priority.code),
    };
  }

  let intent = {};
  if (task.intent && task.intent.code) {
    intent = {
      intent: Util.setEmptyStringWhenUndefined(task.intent.code),
    };
  }

  let performerType = {};
  if (task.performerType && task.performerType.code) {
    performerType = {
      performerType: Util.setEmptyStringWhenUndefined(task.performerType.code),
    };
  }

  let activityDefinition = {};
  if (task.definition && task.definition.reference) {
    const reference = task.definition.reference.split('/');
    activityDefinition = {
      activityDefinition: Util.setEmptyStringWhenUndefined(reference[1]),
    };
  }

  return merge(Util.pickByIdentity(priority), Util.pickByIdentity(intent), Util.pickByIdentity(performerType), Util.pickByIdentity(activityDefinition));
}


export default ManageTask;
