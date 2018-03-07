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
import { EMPTY_STRING } from '../../containers/App/constants';


function ManageTask(props) {
  const {
    onSave, taskStatus, requestIntent,
    requestPriority, taskPerformerType, selectedPatient,
    organization, activityDefinitions, practitioners, requester, tasksByPatient, eventTypes,
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
    requester,
    tasksByPatient,
    eventTypes,
    editMode,
  };

  return (
    <div>
      {((editMode && currentTask) || !editMode) &&
      <Formik
        initialValues={setFormData(currentTask, props)}
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
  organization: PropTypes.arrayOf((PropTypes.shape({
    reference: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  }))),
  eventTypes: PropTypes.arrayOf((PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  }))),
  tasksByPatient: PropTypes.arrayOf((PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  }))),
  activityDefinitions: PropTypes.array,
  requester: PropTypes.object,
  practitioners: PropTypes.array,
  editMode: PropTypes.bool.isRequired,
  currentTask: PropTypes.any,
};
function setFormData(currentTask, props) {
  let formData = null;
  if (!isEmpty(currentTask)) {
    // Edit Form
    formData = merge(Util.pickByIdentity(mapTaskToEditForm(currentTask)));
  } else {
     // Create Form
    formData = merge(Util.pickByIdentity(mapTaskToCreateForm(props)));
  }
  return Util.pickByIdentity(formData);
}


function mapTaskToCreateForm(props) {
  // Drop down values
  const requester = {
    requester: Util.setEmptyStringWhenUndefined(getResourceName(props.requester)),
  };

  const patientName = {
    patientName: Util.setEmptyStringWhenUndefined(getResourceName(props.selectedPatient)),
  };

  return merge(Util.pickByIdentity(requester), Util.pickByIdentity(patientName));
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
    activityDefinition = {
      activityDefinition: Util.setEmptyStringWhenUndefined(task.definition.reference),
    };
  }

  let organization = {};
  if (task.organization && task.organization.reference) {
    organization = {
      organization: Util.setEmptyStringWhenUndefined(task.organization.reference),
    };
  }

  return merge(Util.pickByIdentity(priority),
                Util.pickByIdentity(intent),
                Util.pickByIdentity(performerType),
                Util.pickByIdentity(activityDefinition),
                Util.pickByIdentity(organization));
}


function getResourceName(resource) {
  if (resource === undefined) {
    return '';
  }
  const names = resource.name;
  return names && names
    .map((name) => {
      const firstName = name.firstName !== EMPTY_STRING ? name.firstName : EMPTY_STRING;
      const lastName = name.lastName !== EMPTY_STRING ? name.lastName : EMPTY_STRING;
      let fullName = EMPTY_STRING;
      fullName = `${firstName} ${lastName}`;
      return fullName;
    })
    .join(', ');
}
export default ManageTask;
