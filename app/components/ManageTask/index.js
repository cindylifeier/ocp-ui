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

import { EMPTY_STRING } from 'containers/App/constants';
import messages from './messages';
import ManageTaskForm from './ManageTaskForm';

function ManageTask(props) {
  const {
    onSave, taskStatus, requestIntent,
    requestPriority, taskPerformerType, selectedPatient,
    organization, activityDefinitions, practitioners, requester, tasksByPatient, eventTypes,
    currentTask, editMode, isMainTask, parentTask,
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
    isMainTask,
    parentTask,
  };

  return (
    <div>
      {((editMode && (currentTask || isMainTask)) || !editMode) &&
      <Formik
        initialValues={setFormData(currentTask, isMainTask, parentTask, requester)}
        onSubmit={(values, actions) => {
          onSave(values, actions);
        }}
        validationSchema={() =>
          yup.lazy((values) => {
            let taskStart = new Date();
            if (values.taskStart) {
              taskStart = values.taskStart;
            }
            return yup.object().shape({
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
              description: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              taskStart: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(new Date().toLocaleDateString(), (<FormattedMessage {...messages.validation.minStartDate} />)),
              taskEnd: yup.date()
                .min(taskStart.toLocaleDateString(), (<FormattedMessage {...messages.validation.minEndDate} />)),
            });
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
  isMainTask: PropTypes.bool.isRequired,
  currentTask: PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  }),
  parentTask: PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  }),
};

function setFormData(currentTask, isMainTask, parentTask, organization, selectedPatient, requester) {
  let formData = null;
  if (!isEmpty(currentTask) && isMainTask) {
    // Edit Main TaskForm
    formData = mapMainTaskToEditForm(currentTask);
  } else {
    // Create Main Task Form
    formData = mapMainTaskToCreateForm(organization, parentTask, selectedPatient, requester);
  }
  return formData;
}

function mapPropsToRequester(requester) {
  return {
    selRequester: Util.setEmptyStringWhenUndefined(getResourceName(requester)),
  };
}

function mapMainTaskToCreateForm(organization, parentTask, selectedPatient, requester) {
  let selOrg = {};
  let organizationData = {};
  if (organization && organization.length > 0) {
    selOrg = organization[0];
    organizationData = {
      selOrganization: selOrg && selOrg.display ? selOrg.display : '',
    };
  }
  // Row 1
  let activityDefinition = {};
  if (parentTask && parentTask.definition && parentTask.definition.reference) {
    activityDefinition = {
      activityDefinition: Util.setEmptyStringWhenUndefined(parentTask.definition.reference),
    };
  }
  // Row 5
  let taskOwner = {};
  if (parentTask && parentTask.owner && parentTask.owner.reference) {
    taskOwner = {
      taskOwner: parentTask.owner.reference,
    };
  }
  let selPartOf = {};
  if (parentTask && parentTask.logicalId) {
    selPartOf = {
      partOf: `Task/${parentTask.logicalId}`,
    };
  }
  const readData = {
    patientName: Util.setEmptyStringWhenUndefined(getResourceName(selectedPatient)),
    authoredOn: new Date(),
    lastModifiedDate: new Date(),
    taskStart: new Date(),
  };
  return merge(activityDefinition, organizationData, taskOwner, selPartOf, readData, mapPropsToRequester(requester));
}

function mapMainTaskToEditForm(task) {
  // Row 1
  let activityDefinition = {};
  if (task.definition && task.definition.reference) {
    activityDefinition = {
      activityDefinition: Util.setEmptyStringWhenUndefined(task.definition.reference),
    };
  }
  // Row 2
  let selOrganization = {};
  if (task.organization && task.organization.display) {
    selOrganization = {
      selOrganization: Util.setEmptyStringWhenUndefined(task.organization.display),
    };
  }
  let patientName = {};
  if (task.beneficiary && task.beneficiary.display) {
    patientName = {
      patientName: Util.setEmptyStringWhenUndefined(task.beneficiary.display),
    };
  }
  let selRequester = {};
  if (task.agent && task.agent.display) {
    selRequester = {
      selRequester: Util.setEmptyStringWhenUndefined(task.agent.display),
    };
  }
  // Row 3
  let authoredOn = {};
  if (task.authoredOn) {
    const createDate = Util.setEmptyStringWhenUndefined(task.authoredOn);
    authoredOn = {
      authoredOn: createDate && new Date(createDate),
    };
  }
  let lastModifiedDate = {};
  if (task.lastModified) {
    const updateDate = Util.setEmptyStringWhenUndefined(task.lastModified);
    lastModifiedDate = {
      lastModifiedDate: updateDate && new Date(updateDate),
    };
  }
  // Row 4 - Drop down values
  let status = {};
  if (task.status && task.status.code) {
    status = {
      status: Util.setEmptyStringWhenUndefined(task.status.code),
    };
  }
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
  let context = {};
  if (task.context && task.context.reference) {
    context = {
      context: Util.setEmptyStringWhenUndefined(task.context.reference),
    };
  }
  // Row 5
  let taskOwner = {};
  if (task.owner && task.owner.reference) {
    taskOwner = {
      taskOwner: Util.setEmptyStringWhenUndefined(task.owner.reference),
    };
  }
  let performerType = {};
  if (task.performerType && task.performerType.code) {
    performerType = {
      performerType: Util.setEmptyStringWhenUndefined(task.performerType.code),
    };
  }
  let partOf = {};
  if (task.partOf && task.partOf.reference) {
    partOf = {
      partOf: Util.setEmptyStringWhenUndefined(task.partOf.reference),
    };
  }
  // Row 6
  let taskStart = {};
  if (task.executionPeriod && task.executionPeriod.start) {
    const startDate = Util.setEmptyStringWhenUndefined(task.executionPeriod.start);
    taskStart = {
      taskStart: startDate && new Date(startDate),
    };
  }
  let taskEnd = {};
  if (task.executionPeriod && task.executionPeriod.end) {
    const endDate = Util.setEmptyStringWhenUndefined(task.executionPeriod.end);
    taskEnd = {
      taskEnd: endDate && new Date(endDate),
    };
  }

  // Row 7
  let description = {};
  if (task.description) {
    description = {
      description: Util.setEmptyStringWhenUndefined(task.description),
    };
  }
  let comments = {};
  if (task.note) {
    comments = {
      comments: Util.setEmptyStringWhenUndefined(task.note),
    };
  }


  return merge(activityDefinition,
    selOrganization, patientName, selRequester,
    authoredOn, lastModifiedDate,
    status, priority, intent, context,
    taskOwner, performerType, partOf,
    taskStart, taskEnd,
    description, comments);
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
