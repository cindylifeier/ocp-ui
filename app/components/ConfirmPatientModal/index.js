/**
 *
 * ConfirmPatientModal
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Close from 'material-ui/svg-icons/navigation/close';
import Avatar from 'material-ui/Avatar';
import { Cell } from 'styled-css-grid';

import { PATIENTS_URL } from 'containers/App/constants';
import StyledDialog from 'components/StyledDialog';
import ContinueButton from 'components/ConfirmPatientModal/ContinueButton';
import CloseButton from 'components/ConfirmPatientModal/CloseButton';
import PatientModalGrid from 'components/ConfirmPatientModal/PatientModalGrid';
import PatientModalCell from 'components/ConfirmPatientModal/PatientModalCell';
import patientAvatar from 'images/patient-avatar.png';
import messages from './messages';

function ConfirmPatientModal(props) {
  return (
    <div>
      <StyledDialog
        open={props.isPatientModalOpen}
      >
        <CloseButton tooltip="Close" onClick={props.handlePatientModalClose}><Close /></CloseButton>
        <PatientModalGrid
          columns={1}
          alignContent="space-between"
        >
          <Cell center><Avatar size={80} src={patientAvatar} /></Cell>
          <PatientModalCell center>Name</PatientModalCell>
          <PatientModalCell center>DOB</PatientModalCell>
          <PatientModalCell center>Gender</PatientModalCell>
          <PatientModalCell center>ID</PatientModalCell>
          <PatientModalCell center>Phone</PatientModalCell>
          <Cell center>
            <ContinueButton
              label={<FormattedMessage {...messages.continueButton} />}
              onClick={props.handlePatientModalClose}
              containerElement={<Link to={`${PATIENTS_URL}/${props.patientId}`} />}
            />
          </Cell>
        </PatientModalGrid>
      </StyledDialog>
    </div>
  );
}

ConfirmPatientModal.propTypes = {
  isPatientModalOpen: PropTypes.bool.isRequired,
  handlePatientModalClose: PropTypes.func.isRequired,
  patientId: PropTypes.string.isRequired,
};

export default ConfirmPatientModal;
