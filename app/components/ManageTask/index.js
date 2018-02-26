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
import { EMPTY_STRING } from '../../containers/App/constants';
import Util from '../../utils/Util';

function ManageTask(props) {
  const { onSave, taskStatus, requestIntent,
          requestPriority, taskPerformerType, selectedPatient,
        organization, activityDefinitions, practitioners } = props;
  const formData = { taskStatus,
    requestIntent,
    requestPriority,
    taskPerformerType,
    selectedPatient,
    organization,
    activityDefinitions,
    practitioners };

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

export function getResourceName(resource) {
  const names = resource.name;
  return names && names
    .map((name) => {
      const firstName = name.firstName !== EMPTY_STRING ? name.firstName : EMPTY_STRING;
      const lastName = name.lastName !== EMPTY_STRING ? name.lastName : EMPTY_STRING;
      let fullName = EMPTY_STRING;
      fullName = ` ${firstName} ${lastName}`;
      return fullName;
    })
    .join(', ');
}
export function getSelected(resource) {
  const names = resource.name;
  return names && names
    .map((name) => {
      const firstName = name.firstName !== EMPTY_STRING ? name.firstName : EMPTY_STRING;
      const lastName = name.lastName !== EMPTY_STRING ? name.lastName : EMPTY_STRING;
      let fullName = EMPTY_STRING;
      fullName = ` ${firstName} ${lastName}`;
      return fullName;
    })
    .join(', ');
}

export function getResourceDisplayNameAndId(resource) {
  let displayName = resource.name;
  if (resource && resource.name && resource.logicalId) {
    displayName = `${resource.name}-${resource.logicalId}`;
  }
  return displayName;
}


export function getPractitionerDisplayName(practitioner) {
  let name = {};
  if (practitioner.name.length > 0) {
    const fName = practitioner.name[0];
    const firstName = Util.setEmptyStringWhenUndefined(fName.firstName);
    const lastName = Util.setEmptyStringWhenUndefined(fName.lastName);
    name = `${firstName}-${lastName}`;
  }
  return name;
}

export default ManageTask;
