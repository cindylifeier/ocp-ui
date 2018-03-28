/**
 *
 * ManageAppointment
 *
 */

import React from 'react';
import { Formik } from 'formik';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import yup from 'yup';

import Util from 'utils/Util';
import { mapToPatientName } from 'utils/PatientUtils';
import ManageAppointmentForm from './ManageAppointmentForm';
import messages from './messages';

function ManageAppointment(props) {
  const {
    history,
    patient,
    appointment,
    editMode,
    appointmentStatuses,
    appointmentTypes,
    handleOpen,
    onSave,
    selectedParticipants,
    initialSelectedParticipants,
    removeParticipant,
  } = props;
  const propsFromContainer = {
    history,
    patient,
    appointmentStatuses,
    appointmentTypes,
    handleOpen,
    selectedParticipants,
    initialSelectedParticipants,
    removeParticipant,
  };
  return (
    <div>
      {patient &&
      <div>
        {((editMode && appointment) || !editMode) &&
        <Formik
          isInitialValid={editMode}
          initialValues={setFormData(appointment)}
          onSubmit={(values, actions) => {
            onSave(values, actions);
          }}
          validationSchema={yup.object().shape({
            date: yup.date()
              .required((<FormattedMessage {...messages.validation.required} />))
              .min(new Date().toLocaleDateString(), (<FormattedMessage {...messages.validation.minStartDate} />)),
            appointmentType: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            startTime: yup.date()
              .required((<FormattedMessage {...messages.validation.required} />)),
            endTime: yup.date()
              .required((<FormattedMessage {...messages.validation.required} />)),
          })
          }
          render={(formikProps) => <ManageAppointmentForm {...formikProps} {...propsFromContainer} />}
        />
        }
      </div>
      }
    </div>
  );
}

ManageAppointment.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  handleOpen: PropTypes.func.isRequired,
  removeParticipant: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
  }),
  appointment: PropTypes.object,
  appointmentStatuses: PropTypes.array.isRequired,
  appointmentTypes: PropTypes.array.isRequired,
  selectedParticipants: PropTypes.array,
  initialSelectedParticipants: PropTypes.array,
};

function setFormData(appointment, patient) {
  let formData = null;
  if (!isEmpty(appointment)) {
    formData = {
      patientName: mapToPatientName(patient),
      description: appointment.description,
      status: appointment.statusCode,
      date: appointment.date,
      startTime: appointment.startTime,
      endDate: appointment.endTime,
      appointmentType: appointment.appointmentType,
    };
  }
  return Util.pickByIdentity(formData);
}

export default ManageAppointment;

