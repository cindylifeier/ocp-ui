/**
 *
 * ConfirmPatientModal
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import upperFirst from 'lodash/upperFirst';
import Close from 'material-ui/svg-icons/navigation/close';
import Avatar from 'material-ui/Avatar';
import { Cell } from 'styled-css-grid';

import { mapToPatientName, mapToPatientPhone } from 'utils/PatientUtils';
import defaultPatientAvatarImage from 'images/patient-avatar.png';
import { PATIENTS_URL, WHITE_SPACE } from 'containers/App/constants';
import StyledDialog from 'components/StyledDialog';
import StyledRaisedButton from 'components/StyledRaisedButton';
import CloseButton from './CloseButton';
import PatientModalGrid from './PatientModalGrid';
import PatientModalCell from './PatientModalCell';
import messages from './messages';

function ConfirmPatientModal(props) {
  const { patient, isPatientModalOpen, onPatientModalClose } = props;
  return (
    <div>
      <StyledDialog
        open={isPatientModalOpen}
      >
        <CloseButton tooltip="Close" onClick={onPatientModalClose}><Close /></CloseButton>
        <PatientModalGrid
          columns={1}
          alignContent="space-between"
        >
          <Cell center><Avatar size={80} src={defaultPatientAvatarImage} /></Cell>
          <PatientModalCell center>
            Name{WHITE_SPACE}<strong>{mapToPatientName(patient)}</strong>
          </PatientModalCell>
          <PatientModalCell center>
            DOB{WHITE_SPACE}<strong>{patient.birthDate}</strong>
          </PatientModalCell>
          <PatientModalCell center>
            Gender{WHITE_SPACE}<strong>{upperFirst(patient.genderCode)}</strong>
          </PatientModalCell>
          <PatientModalCell center>
            ID{WHITE_SPACE}<strong>{patient.id}</strong>
          </PatientModalCell>
          <PatientModalCell center>
            Phone{WHITE_SPACE}<strong>{mapToPatientPhone(patient)}</strong>
          </PatientModalCell>
          <Cell center>
            <StyledRaisedButton
              width="140px"
              onClick={onPatientModalClose}
              component={Link}
              to={`${PATIENTS_URL}/${patient.id}`}
            >
              <FormattedMessage {...messages.continueButton} />
            </StyledRaisedButton>
          </Cell>
        </PatientModalGrid>
      </StyledDialog>
    </div>
  );
}

ConfirmPatientModal.propTypes = {
  isPatientModalOpen: PropTypes.bool.isRequired,
  onPatientModalClose: PropTypes.func.isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
    birthDate: PropTypes.string,
    genderCode: PropTypes.string,
  }).isRequired,
};

export default ConfirmPatientModal;
