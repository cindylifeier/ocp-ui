/**
 *
 * ManageAppointment
 *
 */

import ManageAppointmentForm from 'components/ManageAppointment/ManageAppointmentFormOne';
import { Formik } from 'formik';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';

import { FormattedMessage } from 'react-intl';
import mapToPatientName from 'utils/PatientUtils';
import Util from 'utils/Util';
import yup from 'yup';
import messages from './messages';

function ManageAppointment(props) {
  const {
    selectedPatient,
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
    selectedPatient,
    appointmentStatuses,
    appointmentTypes,
    handleOpen,
    selectedParticipants,
    initialSelectedParticipants,
    removeParticipant,
  };
  return (
    <div>
      {selectedPatient &&
      <div>
        {((editMode && appointment) || !editMode) &&
        <Formik
          isInitialValid={editMode}
          initialValues={setFormData(appointment)}
          onSubmit={(values, actions) => {
            onSave(values, actions);
          }}
          validationSchema={yup.object().shape({
            patientName: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            date: yup.date()
              .required((<FormattedMessage {...messages.validation.required} />)),
            status: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            startDate: yup.date()
              .required((<FormattedMessage {...messages.validation.required} />))
              .min(new Date().toLocaleDateString(), (<FormattedMessage {...messages.validation.minStartDate} />)),
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
  selectedPatient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
  }),
  appointment: PropTypes.any,
  appointmentStatuses: PropTypes.array.isRequired,
  appointmentTypes: PropTypes.array.isRequired,
  selectedParticipants: PropTypes.array,
  initialSelectedParticipants: PropTypes.array,
};

function setFormData(appointment, selectedPatient) {
  let formData = null;
  if (!isEmpty(appointment)) {
    formData = {
      patientName: mapToPatientName(selectedPatient),
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

