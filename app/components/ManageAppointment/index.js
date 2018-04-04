/**
 *
 * ManageAppointment
 *
 */

import { Formik } from 'formik';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Util from 'utils/Util';
import yup from 'yup';
import ManageAppointmentForm from './ManageAppointmentForm';
import messages from './messages';

function ManageAppointment(props) {
  const {
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
    patient,
    editMode,
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
      selectedPatient: patient,
      description: appointment.description,
      appointmentType: appointment.typeCode,
      date: appointment.appointmentDate && new Date(appointment.appointmentDate),
      status: appointment.statusCode,
      startTime: convertDateTimeArrayToDate(appointment.start),
      endTime: convertDateTimeArrayToDate(appointment.end),
      appointmentStatus: appointment.statusCode,
    };
  }
  return Util.pickByIdentity(formData);
}

function convertDateTimeArrayToDate(date) {
  if (date) {
    return new Date(date[0], date[1], date[2], date[3], date[4]);
  }
  return [];
}


export default ManageAppointment;

